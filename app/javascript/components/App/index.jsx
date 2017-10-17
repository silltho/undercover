import React from 'react'
import PropTypes from 'prop-types'
import UserService from 'services/users'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: props.user
    }
    new UserService()
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
