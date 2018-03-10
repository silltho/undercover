class Article < ApplicationRecord
  belongs_to :game
  belongs_to :player
  belongs_to :player

  def get_article_object
    {
        id: id,
        game: game,
        round: round,
        commiter: committer,
        vicitm: victim,
        sucess: success
    }
  end
end
