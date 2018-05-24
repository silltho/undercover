const AUDIO_TAG = document.getElementById('soundtrack')
const AUDIO_CONTROL = document.getElementsByClassName('audio-control')[0]
const VOLUME_ICON_UP = document.getElementsByClassName('volume-icon-up')[0]
const VOLUME_ICON_OFF = document.getElementsByClassName('volume-icon-off')[0]

AUDIO_CONTROL.addEventListener('click', () => {
  if (!AUDIO_TAG.muted) {
    AUDIO_TAG.muted = true
    VOLUME_ICON_UP.classList.add('hide')
    VOLUME_ICON_OFF.classList.remove('hide')
  } else {
    AUDIO_TAG.muted = false
    VOLUME_ICON_UP.classList.remove('hide')
    VOLUME_ICON_OFF.classList.add('hide')
  }
})
