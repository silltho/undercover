import data from 'assets/images/eastereggs/ballon.gif'

export default function () {
  const img = new Image()
  img.src = data
  img.style.width = '300px'
  img.style.height = '600px'
  img.style.transition = '13s all'
  img.style.position = 'fixed'
  img.style.right = '-500px'
  img.style.bottom = '50%'
  img.style.transform = 'translateY(50%)'
  img.style.zIndex = 999999

  document.body.appendChild(img)

  window.setTimeout(() => {
    img.style.right = 'calc(100% + 500px)'
  }, 50)

  window.setTimeout(() => {
    img.parentNode.removeChild(img)
  }, 10300)
}
