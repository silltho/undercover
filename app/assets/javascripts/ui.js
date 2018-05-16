const PLAY_BUTTON = document.getElementsByClassName('play-game-button')[0]

function play() {
  const AUDIO = document.getElementById('play_game')
  AUDIO.play()
}

PLAY_BUTTON.addEventListener('click', play)
