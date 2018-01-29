import { createChannel } from 'services/cable'
import {
  CREATE_GAME
} from './constants'

let dispatch

const channel = createChannel('DashboardChannel', {
  received(data) {
    dispatch(data)
  }
})

function init(store) {
  dispatch = store.dispatch
}

function createGame(title) {
  channel.perform(CREATE_GAME, { title })
}

export default {
  init,
  createGame
}
