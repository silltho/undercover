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
        PLAY_BUTTON.addEventListener('click', playStartSound)

        function playStartSound(e) {
          e.preventDefault()
          SOUNDTRACK_BUTTON.pause()
          SOUNDTRACK_BUTTON.currentTime = 0
          const AUDIO = document.getElementById('playsound')
          console.log(AUDIO.duration);
          AUDIO.play()
          AUDIO.volume = 0.7
          setTimeout(function() { window.location.href = '/app' }, (AUDIO.duration * 1000) - 200)

        }

        const AUDIO_CONTROL = document.getElementById('audio-control')
        const VOLUME_ICON_UP = document.getElementById('volume-icon-up')
        const VOLUME_ICON_OFF = document.getElementById('volume-icon-off')

        function toggleAudioControl() {
          if (SOUNDTRACK_BUTTON.paused === false) {
            SOUNDTRACK_BUTTON.pause()
            VOLUME_ICON_UP.classList.add('hide')
            VOLUME_ICON_OFF.classList.remove('hide')
          } else {
            SOUNDTRACK_BUTTON.play()
            VOLUME_ICON_UP.classList.remove('hide')
            VOLUME_ICON_OFF.classList.add('hide')
          }
        }

        AUDIO_CONTROL.addEventListener('click', () => {
          toggleAudioControl()
        })
      });
   "
  end
end

