import {
  createChannel
} from 'services/cable'

let dispatch
let channel
let gameId

function joinGameChannel(id) {
  if (gameId !== id) {
    if (channel) channel.unsubscribe()
    gameId = id
    channel = createChannel({ channel: 'GamesChannel', id }, {
      received(data) {
        dispatch(data)
      }
    })
  }
}

function unsubscribe() {
  gameId = null
  channel.unsubscribe()
}

function init(store) {
  dispatch = store.dispatch
}


export default {
  init,
	joinGameChannel,
	unsubscribe
}
