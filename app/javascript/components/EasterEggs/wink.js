import data from 'assets/images/eastereggs/wink.gif'

export default function () {
  const shock = document.createElement('div')

  const img = new Image()
  img.src = data
  img.style.width = '300px'
  img.style.height = '300px'
  img.style.transition = '1s all'
  img.style.position = 'fixed'
  img.style.left = 'calc(50% - 300px)'
  img.style.bottom = '-600px'
  img.style.zIndex = 999999

  document.body.appendChild(img)

  window.setTimeout(() => {
    img.style.bottom = '0px'
  }, 30)

  window.setTimeout(() => {
    img.style.bottom = '-600px'
  }, 4300)
  window.setTimeout(() => {
    img.parentNode.removeChild(img)
    shock.parentNode.removeChild(shock)
  }, 5400)
}
