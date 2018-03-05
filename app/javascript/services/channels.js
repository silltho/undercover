import UserChannel from './channels/users'
import GameChannel from './channels/games'

export default (store) => {
  UserChannel.init(store)
  GameChannel.init(store)
}

export {
  UserChannel,
  GameChannel
}
