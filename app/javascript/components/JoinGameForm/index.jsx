import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import {
  Wrapper,
  RoomCodeInput
} from './Styles'

class JoinGameForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      gamecode: ''
    }
  }

  onInputChange = (e) => {
    this.setState({
      gamecode: e.target.value
    })
  }

  onInputKeyDown = (e) => {
    if (e.key === 'Enter') this.joinGame()
  }

  joinGame = () => {
    this.props.joinGame(this.state.gamecode)
  }

  render() {
    return (
      <Wrapper>
        <RoomCodeInput id="game-code-input" placeholder="Game Code" onChange={this.onInputChange} onKeyDown={this.onInputKeyDown} />
        <Button text="join" onClick={this.joinGame} />
      </Wrapper>
    )
  }
}

JoinGameForm.propTypes = {
  joinGame: PropTypes.func.isRequired
}

export default JoinGameForm
