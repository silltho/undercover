import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Input from 'components/Input'
import {
  Wrapper
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
    const error = this.props.wrongGameCode ? 'invalid Gamecode' : ''
    return (
      <Wrapper>
        <Input
          name="game-code"
          placeholder="Enter Room Code"
          label="Room Code"
          error={error}
          type="number"
          onChange={this.onInputChange}
          onKeyDown={this.onInputKeyDown}
        />
        <Button text="join" onClick={this.joinGame} />
      </Wrapper>
    )
  }
}

JoinGameForm.propTypes = {
  joinGame: PropTypes.func.isRequired,
  wrongGameCode: PropTypes.bool.isRequired
}

export default JoinGameForm
