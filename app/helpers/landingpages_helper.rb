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
        const TRACK_TAG = document.getElementById('soundtrack')
        const AUDIO_CONTROL = document.getElementsByClassName('audio-control')[0]
        const VOLUME_ICON_UP = document.getElementsByClassName('volume-icon-up')[0]
        const VOLUME_ICON_OFF = document.getElementsByClassName('volume-icon-off')[0]

        AUDIO_CONTROL.addEventListener('click', () => {
          if (!TRACK_TAG.muted) {
            TRACK_TAG.muted = true
            VOLUME_ICON_UP.classList.add('hide')
            VOLUME_ICON_OFF.classList.remove('hide')
          } else {
            TRACK_TAG.muted = false
            VOLUME_ICON_UP.classList.remove('hide')
            VOLUME_ICON_OFF.classList.add('hide')
          }
        })

        function play() {
          TRACK_TAG.muted = true;
          const AUDIO = document.getElementById('playsound')

          setTimeout(function() { AUDIO.play() }, 500)
        }

        PLAY_BUTTON.addEventListener('click', play)
      });
   "
  end
end

