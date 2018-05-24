export default function () {
  const data = 'https://i.imgur.com/Np8rIoY.gif'
  const img = new Image()

  img.src = data
  img.style.width = '400px'
  img.style.height = '350px'
  img.style.transition = '8s all linear'
  img.style.position = 'fixed'
  img.style.left = '-400px'
  img.style.bottom = '-10px'
  img.style.zIndex = 999999

  document.body.appendChild(img)

  window.setTimeout(() => {
    img.style.left = 'calc(100% + 500px)'
  }, 50)

  window.setTimeout(() => {
    img.parentNode.removeChild(img)
  }, 8000)
}
