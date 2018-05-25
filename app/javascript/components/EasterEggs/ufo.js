import data from 'assets/images/eastereggs/ufo.gif'

export default function () {
  const img = new Image()
  img.src = data
  img.style.width = '374px'
  img.style.height = '375px'
  img.style.transition = '13s all'
  img.style.position = 'fixed'
  img.style.right = '-374px'
  img.style.top = '0px'
  img.style.zIndex = 999999

  document.body.appendChild(img)

  window.setTimeout(() => {
    img.style.right = 'calc(100% + 500px)'
  }, 50)

  window.setTimeout(() => {
    img.parentNode.removeChild(img)
  }, 10300)
}
