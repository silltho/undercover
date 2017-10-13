import consumer from './../index'

class UserService {
  constructor() {
    this.users = this.users ? this.users : this.connect()
  }

  connect = () => consumer.subscriptions.create('MessageChannel', {
    connected() {
      console.log('Cable connected')
    }
  })
}

export default UserService
