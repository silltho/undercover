module LandingpagesHelper

  # https://rietta.com/blog/2011/12/26/how-to-automate-copyright-notice/
  def copyright_notice_year_range(start_year)
    start_year = start_year.to_i

    current_year = Time.new.year

    if current_year > start_year && start_year > 2000
      "#{start_year} - #{current_year}"
    elsif start_year > 2000
      "#{start_year}"
    else
      "#{current_year}"
    end
  end

  def init_playbutton()
    javascript_tag "
    const PLAY_BUTTON = document.getElementsByClassName('play-game-button')[0]

    function play() {
      const AUDIO = document.getElementById('play_game')
      AUDIO.play()
    }

    PLAY_BUTTON.addEventListener('click', play)"
  end
end

