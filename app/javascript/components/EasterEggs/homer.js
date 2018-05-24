export default function () {
  const data = 'https://i.imgur.com/7EXwuS0.gif'
  const img = new Image()

  img.src = data
  img.style.width = '350px'
  img.style.height = '350px'
  img.style.transition = '4s all'
  img.style.position = 'fixed'
  img.style.left = '-400px'
  img.style.bottom = 'calc(-50% + 320px)'
  img.style.zIndex = 999999

  document.body.appendChild(img)

  window.setTimeout(() => {
    img.style.left = 'calc(100% + 500px)'
  }, 50)

  window.setTimeout(() => {
    img.parentNode.removeChild(img)
  }, 4300)
}
