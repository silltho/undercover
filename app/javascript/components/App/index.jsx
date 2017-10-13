import React from 'react'
import UserService from 'services/users'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: 'Conan'
    }
    new UserService()
  }

  render() {
    return (
      <div>
        <h2>Undercover App</h2>
        <hr />
        <span>Hallo {this.state.currentUser}</span>
        <hr />
      </div>
    )
  }
}

export default App
