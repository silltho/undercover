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
      codenameErrorMessage: '',
      roomCodeErrorMessage: '',
      codename: '',
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

  onCodenameChange = (e) => {
    this.setState({
      codename: e.target.value,
      codenameErrorMessage: ''
    })
  }

  onInputKeyDown = (e) => {
    if (e.key === 'Enter') this.joinGame()
  }

  createGame = () => {
    this.resetErrors()
    if (this.validateCodename()) {
      this.props.createGame(this.state.codename)
    }
  }

  joinGame = () => {
    this.resetErrors()
    const validateCodename = this.validateCodename()
    const validateGamecode = this.validateGamecode()
    if (validateGamecode && validateCodename) {
      this.props.joinGame(this.state.gamecode, this.state.codename)
    }
  }

  validateCodename = () => {
    if (this.state.codename.length <= 0) {
      this.setState({ codenameErrorMessage: 'Codename is required' })
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
      codenameErrorMessage: '',
      roomCodeErrorMessage: ''
    })
  }

  render() {
    const codenameInvalid = this.state.codename.length <= 0

    return (
      <Form>
        <Row>
          <Input
            name="codename"
            placeholder="Enter Your Codename"
            label="Codename"
            error={this.state.codenameErrorMessage}
            type="text"
            onChange={this.onCodenameChange}
          />
        </Row>
        <Row deactivated={codenameInvalid}>
          <Button text="create new game" onClick={this.createGame} />
        </Row>
        <SeperatorRow deactivated={codenameInvalid}>
          <Heading title="or" />
        </SeperatorRow>
        <Row deactivated={codenameInvalid}>
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