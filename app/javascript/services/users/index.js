import consumer from './../index'

class UserService {
  constructor() {
    this.users = this.users ? this.users : this.connect()
  }

  connect = () => consumer.subscriptions.create({ channel: 'MessageChannel', game: '1' }, {
    connected() {
      console.log('Cable connected')
    },
    received(data) {
      console.log(`receive data: ${data}`)
    }
  })
}

export default UserService
