import {
  createChannel
} from 'services/cable'
import {
  INITIALIZE_GAME,
  START_GAME,
  END_INFO_PHASE,
  END_EXCHANGE_PHASE,
  USE_SKILL,
  ALL_SKILLS_USED,
  DRAW_GAME
} from '../constants'

let dispatch
let channel
let gameId

function joinGameChannel(id) {
  if (gameId !== id) {
    if (channel) channel.unsubscribe()
    gameId = id
    channel = createChannel({ channel: 'GamesChannel', gamecode: id }, {
      received(data) {
        dispatch(data)
      }
    })
  }
}

function unsubscribe() {
  channel.unsubscribe()
  gameId = null
  channel = null
}

function initializeGame() {
  channel.perform(INITIALIZE_GAME)
}

function endInfoPhase() {
  channel.perform(END_INFO_PHASE)
}

function endExchangePhase() {
  channel.perform(END_EXCHANGE_PHASE)
}

function useSkill(victim) {
  channel.perform(USE_SKILL, { victim })
}

function allSkillsUsed() {
  channel.perform(ALL_SKILLS_USED)
}

function startGame() {
  channel.perform(START_GAME)
}

function drawGame() {
  channel.perform(DRAW_GAME)
}

function init(store) {
  dispatch = store.dispatch
}

export default {
  init,
  joinGameChannel,
  unsubscribe,
  initializeGame,
  endExchangePhase,
  endInfoPhase,
  useSkill,
  drawGame,
  startGame,
  allSkillsUsed
}
