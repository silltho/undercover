import data from 'assets/images/eastereggs/britney.gif'

export default function () {
  const img = new Image()
  img.src = data
  img.style.width = '250px'
  img.style.height = '180px'
  img.style.transition = '1s all'
  img.style.position = 'fixed'
  img.style.left = 'calc(50% - 125px)'
  img.style.bottom = '-149px'
  img.style.zIndex = 999999

  document.body.appendChild(img)

  window.setTimeout(() => {
    img.style.bottom = '0px'
  }, 50)

  window.setTimeout(() => {
    img.style.bottom = '-149px'
  }, 4300)
  window.setTimeout(() => {
    img.parentNode.removeChild(img)
  }, 5400)
}
