export default function () {
  const data = 'https://i.imgur.com/hALdLiE.gif'
  const shock = document.createElement('div')
  const img = new Image()
  img.src = data
  img.style.width = '250px'
  img.style.height = '149px'
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
    shock.style.width = '100%'
    shock.style.height = '100%'
    shock.style.left = 0
    shock.style.top = 0
    shock.style.position = 'fixed'
    shock.style.zIndex = 9999999
    shock.style.background = '#fffb95'
    shock.style.opacity = 0

    document.body.appendChild(shock)

    for (let x = 0; x < 81; x += 1) {
      (function (t) {
        window.setTimeout(() => {
          if (t % 2 === 0) {
            shock.style.opacity = 0
          } else {
            shock.style.opacity = 0.3
          }
        }, t * 25)
      }(x))
    }
  }, 2500)

  window.setTimeout(() => {
    img.style.bottom = '-149px'
  }, 4300)
  window.setTimeout(() => {
    img.parentNode.removeChild(img)
    shock.parentNode.removeChild(shock)
  }, 5400)
}
