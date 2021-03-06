import data from 'assets/images/eastereggs/winner.gif'

export default function () {
  const img = new Image()
  img.src = data
  img.style.width = '450px'
  img.style.height = '400px'
  img.style.transition = '1s all'
  img.style.position = 'fixed'
  img.style.left = 'calc(50% - 200px)'
  img.style.bottom = '-400px'
  img.style.zIndex = 999999

  document.body.appendChild(img)

  window.setTimeout(() => {
    img.style.bottom = '-65px'
  }, 30)

  window.setTimeout(() => {
    img.style.bottom = '-600px'
  }, 4300)

  window.setTimeout(() => {
    img.parentNode.removeChild(img)
  }, 5400)
}
