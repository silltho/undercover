export default function () {
  const data = 'https://i.imgur.com/rJRRZw7.gif'
  const img = new Image()

  img.src = data
  img.style.width = '1050px'
  img.style.height = '300px'
  img.style.transition = '7s all'
  img.style.position = 'fixed'
  img.style.left = '-1100px'
  img.style.bottom = 'calc(-50% + 320px)'
  img.style.zIndex = 999999

  document.body.appendChild(img)

  window.setTimeout(() => {
    img.style.left = 'calc(100% + 500px)'
  }, 50)

  window.setTimeout(() => {
    img.parentNode.removeChild(img)
  }, 7300)
}
