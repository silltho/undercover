import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import Modal, { Content } from 'components/modal'

class StartNewGame extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  onInputChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  createGame = () => {
    this.props.createGame(this.state.title)
    this.setState({
      title: ''
    })
    this.props.onRequestClose()
  }

  render() {
    return (
      <div>
        <FontAwesome name="rocket" />
        <input name="create-game-input" onChange={this.onInputChange} />
        <button onClick={this.createGame}>start new game</button>
      </div>
    )
  }
}

StartNewGame.propTypes = {
	onRequestClose: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired
}

export default StartNewGame
