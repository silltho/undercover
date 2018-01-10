import createChannel from 'services/cable'
import {
  GET_OPEN_GAMES,
  GET_USERINFO
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

export default {
  init,
  getOpenGames,
  getUserinfo
}
