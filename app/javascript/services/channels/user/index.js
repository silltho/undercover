import createChannel from 'services/cable'
import {
  GET_OPEN_GAMES,
  GET_USERINFO
} from './constants'

let callback // declaring a variable that will hold a function later

const channel = createChannel('UserChannel', {
  received(data) {
    if (callback) callback.call(null, data)
  }
})

function getOpenGames() {
  channel.perform(GET_OPEN_GAMES)
}

function getUserinfo() {
  channel.perform(GET_USERINFO)
}

function setCallback(fn) {
  callback = fn
}

export default {
  getOpenGames,
  getUserinfo,
  setCallback
}
