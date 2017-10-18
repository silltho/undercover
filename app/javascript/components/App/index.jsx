import React from 'react'
import PropTypes from 'prop-types'

class App extends React.PureComponent {
    constructor(props) {
        const consumer = ActionCable.createConsumer()

        consumer.subscriptions.create({channel: 'ApplicationChannel'}, {
            connected() {
                console.log('Cable connected')
            },
            received(data) {
                console.log(`receive data: ${data}`)
            }
        })
  }

  render() {
    console.log(`currentUser:${this.state.currentUser.toString()}`)
    return (
      <div>
        <h2>Undercover App</h2>
        <hr />
        <span>Hallo {this.state.currentUser.name}</span>
        <hr />
      </div>
    )
  }
}

App.defaultProps = {
  user: { name: 'Default' }
}

App.propTypes = {
  user: PropTypes.object
}

export default App
