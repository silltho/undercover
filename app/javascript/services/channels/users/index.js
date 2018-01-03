import createChannel from 'services/cable'
import {
  GET_USERINFO
} from './constants'

let callback // declaring a variable that will hold a function later
const channelName = 'UsersChannel'

const channel = createChannel(channelName, {
  received(data) {
    if (callback) callback.call(null, data)
  }
})

function getUserinfo() {
  channel.perform(GET_USERINFO)
}

function setCallback(fn) {
  callback = fn
}

export default {
  getUserinfo,
  setCallback
}
