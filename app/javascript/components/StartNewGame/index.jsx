import React from 'react'
import PropTypes from 'prop-types'

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
      <Wrapper>
        <input name="create-game-input" onChange={this.onInputChange} />
        <button onClick={this.createGame}>start new game</button>
      </Wrapper>
    )
  }
}

StartNewGame.propTypes = {
	onRequestClose: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired
}

export default StartNewGame
