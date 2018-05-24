export default function () {
  const data = 'https://weichiachang.github.io/easter-eggs-mobile/images/unicorn.gif'
  const shock = document.createElement('div')
  const img = new Image()
  img.src = data
  img.style.width = '375px'
  img.style.height = '375px'
  img.style.transition = '13s all'
  img.style.position = 'fixed'
  img.style.right = '-374px'
  // img.style.bottom = 'calc(-50% + 280px)';
  img.style.top = '100px'
  img.style.zIndex = 999999

  document.body.appendChild(img)

  window.setTimeout(() => {
    img.style.right = 'calc(100% + 500px)'
  }, 50)

  // window.setTimeout(function(){
  //   img.style.right = 'calc(100% + 375px)';
  // }, 4500);

  window.setTimeout(() => {
    img.parentNode.removeChild(img)
  }, 10300)
}
