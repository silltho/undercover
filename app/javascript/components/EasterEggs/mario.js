import data from 'assets/images/eastereggs/mario.gif'

export default function () {
  const img = new Image()
  img.src = data
  img.style.width = '350px'
  img.style.height = '300px'
  img.style.transition = '6s all linear'
  img.style.position = 'fixed'
  img.style.left = '-400px'
  img.style.bottom = 0
  img.style.zIndex = 999999

  document.body.appendChild(img)

  window.setTimeout(() => {
    img.style.left = 'calc(100% + 500px)'
  }, 50)

  window.setTimeout(() => {
    img.parentNode.removeChild(img)
  }, 6000)
}
