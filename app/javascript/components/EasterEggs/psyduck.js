export default function () {
  const data = 'https://i.imgur.com/9vCNtPT.gif'
  const shock = document.createElement('div')
  const img = new Image()
  img.src = data
  img.style.width = '500px'
  img.style.height = '500px'
  img.style.transition = '1s all'
  img.style.position = 'fixed'
  img.style.left = 'calc(50% - 250px)'
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
