module LandingpagesHelper

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

  def init_audio()
    javascript_tag "
      document.addEventListener('DOMContentLoaded', function() {
        const PLAY_BUTTON = document.getElementsByClassName('play-game-button')[0]
        const SOUNDTRACK_BUTTON = document.getElementById('soundtrack')

        function playStartSound() {
          SOUNDTRACK_BUTTON.muted = true
          SOUNDTRACK_BUTTON.pause()
          SOUNDTRACK_BUTTON.currentTime = 0
          const AUDIO = document.getElementById('playsound')

          setTimeout(function() { AUDIO.play() }, 100)
        }

        PLAY_BUTTON.addEventListener('click', playStartSound)

        const AUDIO_CONTROL = document.getElementsByClassName('audio-control')[0]
        const VOLUME_ICON_UP = document.getElementsByClassName('volume-icon-up')[0]
        const VOLUME_ICON_OFF = document.getElementsByClassName('volume-icon-off')[0]

        AUDIO_CONTROL.addEventListener('click', () => {
          if (!SOUNDTRACK_BUTTON.muted) {
            SOUNDTRACK_BUTTON.muted = true
            VOLUME_ICON_UP.classList.add('hide')
            VOLUME_ICON_OFF.classList.remove('hide')
          } else {
            SOUNDTRACK_BUTTON.muted = false
            VOLUME_ICON_UP.classList.remove('hide')
            VOLUME_ICON_OFF.classList.add('hide')
          }
        })
      });
   "
  end
end

