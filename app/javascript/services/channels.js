import UserChannel from './channels/users'
import GameChannel from './channels/games'
import DashboardChannel from './channels/dashboard'

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
