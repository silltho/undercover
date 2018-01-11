import createChannel from 'services/cable'

let dispatch
let channel
let gameId

function joinGame(id) {
  if (channel) channel.unsubscribe()
  if (gameId !== id) {
    gameId = id
    channel = createChannel({ channel: 'GamesChannel', id }, {
      received(data) {
        dispatch(data)
      }
    })
  }
}

function init(store) {
  dispatch = store.dispatch
}


export default {
  init,
  joinGame
}
