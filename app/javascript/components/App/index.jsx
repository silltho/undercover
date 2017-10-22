import React from 'react'
import PropTypes from 'prop-types'
import ActionCable from 'actioncable'

class App extends React.PureComponent {
    constructor(props) {
        super(props)
        
        const consumer = ActionCable.createConsumer()
        consumer.subscriptions.create({channel: 'ApplicationChannel'}, {
            connected: () => {
                console.log('Cable connected')
            },
	          received: (data) => {
                console.log(`receive data:`,data)
            }
        })
    }

  render() {
    return (
      <div>
        <h2>Undercover App</h2>
        <hr />
        <span>Hallo ... check console logs</span>
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
