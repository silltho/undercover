import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Input from 'components/Input'
import Heading from 'components/Heading'

import {
  Row,
  Form,
  JoinButton,
  SeperatorRow
} from './Styles'

class GameForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      nicknameErrorMessage: '',
      roomCodeErrorMessage: '',
      nickname: '',
      gamecode: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.wrongGameCode && nextProps.wrongGameCode) {
      this.setState({
        roomCodeErrorMessage: 'invalid Gamecode'
      })
    }

    if (!this.props.fullGame && nextProps.fullGame) {
      this.setState({
        roomCodeErrorMessage: 'Game is already full'
      })
    }
  }

  onGamecodeChange = (e) => {
    this.setState({
      gamecode: e.target.value,
      roomCodeErrorMessage: ''
    })
  }

  onNicknameChange = (e) => {
    this.setState({
      nickname: e.target.value,
      nicknameErrorMessage: ''
    })
  }

  onInputKeyDown = (e) => {
    if (e.key === 'Enter') this.joinGame()
  }

  createGame = () => {
    this.resetErrors()
    if (this.validateNickname()) {
      this.props.createGame(this.state.nickname)
    }
  }

  joinGame = () => {
    this.resetErrors()
    const validateNickname = this.validateNickname()
    const validateGamecode = this.validateGamecode()
    if (validateGamecode && validateNickname) {
      this.props.joinGame(this.state.gamecode, this.state.nickname)
    }
  }

  validateNickname = () => {
    if (this.state.nickname.length <= 0) {
      this.setState({ nicknameErrorMessage: 'Nickname is required' })
      return false
    }
    return true
  }

  validateGamecode = () => {
    if (this.state.gamecode.length <= 0) {
      this.setState({ roomCodeErrorMessage: 'Roomcode is required' })
      return false
    }
    return true
  }

  resetErrors = () => {
    this.setState({
      nicknameErrorMessage: '',
      roomCodeErrorMessage: ''
    })
  }

  render() {
    const nicknameInvalid = this.state.nickname.length <= 0

    return (
      <Form>
        <Row>
          <Input
            name="nickname"
            placeholder="Enter Your Nickname"
            label="Nickname"
            error={this.state.nicknameErrorMessage}
            type="text"
            onChange={this.onNicknameChange}
          />
        </Row>
        <Row deactivated={nicknameInvalid}>
          <Button text="create new game" onClick={this.createGame} />
        </Row>
        <SeperatorRow deactivated={nicknameInvalid}>
          <Heading title="or" />
        </SeperatorRow>
        <Row deactivated={nicknameInvalid}>
          <Input
            name="gamecode"
            placeholder="Enter Room Code"
            label="Room Code"
            error={this.state.roomCodeErrorMessage}
            type="number"
            onChange={this.onGamecodeChange}
            onKeyDown={this.onInputKeyDown}
          />
          <JoinButton text="join" onClick={this.joinGame} />
        </Row>
      </Form>
    )
  }
}

GameForm.propTypes = {
  createGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
  wrongGameCode: PropTypes.bool.isRequired,
  fullGame: PropTypes.bool.isRequired
}

export default GameForm
