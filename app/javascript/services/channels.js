import UserChannel from './entities/users/channels'
import GameChannel from './entities/games/channels'
import DashboardChannel from './entities/dashboard/channels'

export default (store) => {
  UserChannel.init(store)
  GameChannel.init(store)
  DashboardChannel.init(store)
}

export {
  UserChannel,
  GameChannel,
  DashboardChannel
}
