import UserChannel from './entities/users/channels'
import GameChannel from './entities/games/channels'

export default (store) => {
  UserChannel.init(store)
  GameChannel.init(store)
}

export {
  UserChannel,
  GameChannel
}
