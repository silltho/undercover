import { createChannel } from 'services/cable'
import {
  GET_OPEN_GAMES,
  GET_USERINFO,
  CREATE_GAME_REQUEST,
  LEAVE_GAME_REQUEST
} from '../constants'

let dispatch

const channel = createChannel('UserChannel', {
  received(data) {
    dispatch(data)
  }
})

function init(store) {
  dispatch = store.dispatch
}

function createGame() {
	channel.perform(CREATE_GAME_REQUEST)
}

function leaveGame(gameId) {
	channel.perform(LEAVE_GAME_REQUEST, { id: gameId })
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
  getUserinfo,
  createGame,
  leaveGame
}
