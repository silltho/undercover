import { createChannel } from 'services/cable'
import {
  GET_OPEN_GAMES,
  GET_USERINFO,
  CREATE_GAME
} from './constants'

let dispatch

const channel = createChannel('UserChannel', {
  received(data) {
    dispatch(data)
  }
})

function init(store) {
  dispatch = store.dispatch
}

function getOpenGames() {
  channel.perform(GET_OPEN_GAMES)
}

function getUserinfo() {
  channel.perform(GET_USERINFO)
}

function createGame(title) {
  channel.perform(CREATE_GAME, { title })
}

export default {
  init,
  getOpenGames,
  getUserinfo,
  createGame
}
