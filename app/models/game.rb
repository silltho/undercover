class Game < ApplicationRecord
  include AASM
  require 'faker'
  has_many :players, dependent: :destroy
  has_many :articles, dependent: :destroy
  has_many :action_logs, dependent: :destroy
  after_create :set_game_code
  ALWAYS_SUCCESSFUL = %w[blackmail spy shoot poison].freeze
  TOWN = 'Town'
  MAFIA = 'Mafia'
  ANARCHISTS = 'Anarchists'
  DRAW = 'Draw'

  #### STATE MACHINE ####
  aasm whiny_transitions: false do
    state :waiting, initial: true
    state :initialized
    state :inform
    state :activity
    state :finished

    event :initializing do
      transitions from: :waiting, to: :initialized, after: :init_game
    end

    event :started do
      transitions from: :initialized, to: :activity, after: [:cancel_old_jobs, :start_long_timer]
    end

    event :informed do
      transitions from: :inform, to: :activity, after: [:cancel_old_jobs, :start_timer]
    end

    event :skills_used, after: :update_round do
      transitions from: :activity, to: :inform, after: [:cancel_old_jobs, :start_timer]
    end

    event :finish do
      transitions from: :inform, to: :finished, after: :cancel_old_jobs
      transitions from: :activity, to: :finished, after: :cancel_old_jobs
    end

    event :next_state do
      transitions from: :initialized, to: :activity, after:[:cancel_old_jobs, :start_timer]
      transitions from: :inform, to: :activity, after: [:cancel_old_jobs, :start_timer]
      transitions from: :activity, to: :inform, after: [:update_round, :cancel_old_jobs, :start_timer]
    end
  end

  #### BROADCASTS ####

  def broadcast_game_updated
    reload
    GamesChannel.broadcast_to(self, type: 'game_updated', data: get_game_object)
  end

  def broadcast_information_updated
    reload
    GamesChannel.broadcast_to(self, type: 'information_updated', data: get_newspaper_object)
  end

  def broadcast_game_ended(data)
    reload
    GamesChannel.broadcast_to(self, type: 'game_ended', data: data)
  end

  def broadcast_all_players
    players.each do |player|
      player.reload
      player.broadcast_player_updated
    end
  end

  def last_broadcasts(winner)
    data = get_endscreen_object(winner)
    broadcast_game_ended(data)
    send_info_to_player(winner)
  end

  def start_timer
    self.last_job = GameWorker.perform_in(27.seconds, id)
  end

  def start_long_timer
    self.last_job = GameWorker.perform_in(40.seconds, id)
  end

  def cancel_old_jobs
    return if self.last_job.nil?
    Sidekiq::Status.unschedule self.last_job
  end

  def time_is_up
    self.next_state!
    broadcast_all_players if aasm_state == 'inform'
    broadcast_information_updated if aasm_state == 'inform'
    finish! if is_game_over? && aasm_state != 'finished'
    broadcast_game_updated
  end

  #### INITIALIZING ####

  def init_players
    roles_array = assign_roles(players.size)
    players.each do |player|
      player.reset!
      player.reload
      player.assign_character(roles_array.delete(roles_array.sample))
    end
    players.each(&:init_relations)
  end

  def cleanup
    Article.where(game: self).destroy_all
    Relation.where(player1: players).destroy_all
    ActionLog.where(game: self)
  end


  def init_game
    init_players
    players.each do |player|
      player.broadcast_player_updated
    end
  end


  def add_player(player)
    if Player.where(user: player.user, game: self).count > 1
      p = Player.where(user_id: player.user.id, game: self)
      players.delete(p)
      p.destroy
    else
      players << player
    end
  end

  def create_game_code
    code = nil
    until unique_game_code(code) && code != nil
      code = ('0'..'9').to_a.shuffle[0,4].join
    end
    code
  end

  def set_game_code
    update(code: create_game_code)
  end

  def unique_game_code(code)
    !Game.where(code: code).exists?
  end

  #### BUILDING OBJECTS ####

  def get_game_object
    reload
    {  id: id,
       code: code,
       aasm_state: aasm_state,
       round: round,
       start_info: { players: players.order(:id),
                     party_distribution: get_party_members
       }
    }
  end

  def get_newspaper_object
    {
      round => {
                  infos: create_stories(round - 1),
                  party_distribution: get_party_members
               }
    }
  end

  def get_party_members
    data = {}
    %w[Mafia Town Anarchists Prisoners Dead].each{ |k| data[k] = 0 }
    players.each do |player|
      data[MAFIA] += 1 if belongs_to_mafia(player) && player.state == "alive"
      data[TOWN]+= 1 if belongs_to_town(player) && player.state == "alive"
      data[ANARCHISTS]+= 1 if belongs_to_anarchists(player) && player.state == "alive"
      data["Prisoners"]+= 1  if player.state == "imprisoned"
      data["Dead"]+= 1 if player.state =="dead"
    end
    data
  end

  def get_endscreen_object(party)
    data = Hash.new{|hsh,key| hsh[key] = [] }
    data['winner'] = [{party: party}]
    players.each do |player|
      player_object = {id: player.id, codename: player.codename, role: player.role.name, state: player.state}
      data[MAFIA] <<  player_object if belongs_to_mafia(player)
      data[TOWN] << player_object if belongs_to_town(player)
      data[ANARCHISTS] << player_object if belongs_to_anarchists(player)
    end
    data
  end

  #### HELPERS ####

  def full?
    players.size == 21
  end

  def can_be_started?
    players.size >= 9
  end

  def update_round
    update(round: round + 1 )
  end

  #### BOOLEAN CHECKS ####

  def belongs_to_mafia(player)
    (player.role.try(:party) == MAFIA && player.try(:changed_party) == false) || (player.role.try(:party) == TOWN && player.try(:changed_party) == true)
  end

  def belongs_to_town(player)
    (player.role.try(:party) == TOWN && player.try(:changed_party) == false) || (player.role.try(:party) == MAFIA && player.try(:changed_party) == true)
  end

  def belongs_to_anarchists(player)
    player.role.try(:party) == ANARCHISTS
  end

  def belongs_to_winning_party(player, winner)
    (winner == MAFIA && belongs_to_mafia(player)) || (winner == TOWN && belongs_to_town(player)) || winner == ANARCHISTS && belongs_to_anarchists(player)
  end

  def check_for_prisoners(victim)
    victim.imprisoned?
  end

  def check_for_change(committer, victim)
    if committer.role.passive == 'immunity' && victim.role.passive == 'immunity'
      # president can't convert godfather and vice versa
      false
    elsif not_same_party_anymore(committer, victim)
      # reconverting is possible
      true
    elsif same_party(committer, victim)
      # members of the same party do not change party
      false
    else
      # if not case applies, converting is possible
      true
    end
  end

  def same_party(committer, victim)
    committer.role.party == victim.role.party
  end

  def not_same_party_anymore(committer, victim)
    committer.role.party == victim.role.party && committer.changed_party != victim.changed_party
  end

  def all_users_clicked?(round)
    players.alive.count == Article.where(game: self).where(round: round).group(:committer).maximum(:id).count
  end

  def is_game_over?
    statistic = get_party_members
    if both_heads_dead? || is_draw? || statistic[MAFIA].zero? || statistic[TOWN].zero?
      last_broadcasts(get_winner)
      true
    else
      false
    end
  end

  def is_draw?
    ActionLog.where(game: self).where(round: round).where(action: "draw").group(:player).maximum(:id).count == players.alive.count
  end

  def both_heads_dead?
    gf = Player.where(game: self).where(role: Role.where(name: "Godfather")).pluck(:state).first
    pr = Player.where(game: self).where(role: Role.where(name: "President")).pluck(:state).first
    jr = Player.where(game: self).where(role: Role.where(name: "Anarchist")).pluck(:state).first
    return true if gf != "alive" && pr != "alive" && jr == "alive"
    false
  end

  #### ACTIVITY STACK ####

  def use_skill(committer, victim)
    create_article(committer, victim)
  end

  def calculate_success(c_id, v_id)
    c = Player.find(c_id)
    v = Player.find(v_id)
    # some actions always pass without extra checking
    return true if ALWAYS_SUCCESSFUL.include?(c.role.active)
    # only free people can be imprisoned and only imprisoned people can be freed
    return check_for_prisoners(v) if c.role.active == "free"
    return !check_for_prisoners(v) if c.role.active == "imprison"
    # converting needs extra checking due to immunity of characters and multiple party changes
    check_for_change(c, v)
  end

  # actions are applied to successful happenings
  def apply_action(committer, victim)
    action = committer.role.active
    die = %w[shoot poison]
    imprison = 'imprison'
    release = 'free'
    reveal = %w[blackmail spy]
    change = %w[corrupt convert]
    committer.broadcast_spy_action(victim) if reveal.include?(action)
    victim.imprison! if imprison.include?(action)
    victim.release! if release.include?(action)
    victim.die! if die.include?(action)
    victim.change_party! if change.include?(action)
  end

  #### NEWSPAPER AND STUFF ####

  def create_article(committer, victim)
    success = victim.nil? ? false : calculate_success(committer, victim)
    Article.create(game: self, round: round, committer_id: committer, victim_id: victim, success: success)
  end

  def create_stories(last_round)
    newspaper = []
    get_latest_news(last_round).each do |article|
      role = Player.find(article.committer_id).role
      newspaper << write_success_story(role, article.committer, article.victim, last_round) if article.success
      newspaper << write_fail_story(role) if !article.victim.nil? && !article.success
    end
    newspaper << avoid_empty_newspaper(newspaper)
    newspaper.compact
  end

  def get_latest_news(last_round)
    ids = Article.where(game: self).where(round: last_round).group(:committer).maximum(:id).values
    Article.where(id: ids)
  end

  def avoid_empty_newspaper(newspaper)
    {role: nil, info_text: 'Nothing happened that night.'} if newspaper.empty?
  end

  def write_success_story(role, committer, victim, round_nr)
    apply_action(committer, victim) if self.round - 1 == round_nr
    { role: role.name, info_text: generate_success_text(role, victim) }
  end

  # needs refactoring
  def generate_success_text(role, victim)
    regex_name = /(NAME)/
    regex_role = /(ROLE)/
    role.text_success.gsub(regex_role, victim.role.name).gsub(regex_name, victim.codename)
  end

  def write_fail_story(role)
    { role: role.name, info_text: role.try(:text_fail) }
  end

  #### END GAME ####

  def get_winner
    statistic = get_party_members
    if both_heads_dead?
      ANARCHISTS
    elsif statistic[MAFIA].zero?
      TOWN
    elsif statistic[TOWN].zero?
      MAFIA
    else
      DRAW
    end
  end

  def send_info_to_player(winner)
    players.each do |player|
      if belongs_to_winning_party(player, winner)
        player.broadcast_you_won
      elsif winner == DRAW
        player.broadcast_draw
      else
        player.broadcast_you_lost
      end
    end
  end
end

