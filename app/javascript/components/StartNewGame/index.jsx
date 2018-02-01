import React from 'react'
import PropTypes from 'prop-types'
import Footer from 'components/Footer'
import Button from 'components/Button'
import Title from 'components/Title'
import {
  Wrapper,
  NewGameForm,
  GameTitleInput
} from './Styles'

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

  onInputKeyDown = (e) => {
    if (e.key === 'Enter') this.createGame()
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
        <Title title={(<div>New<br />Game</div>)} />
        <NewGameForm>
          <label htmlFor="create-game-title">Game Title:</label>
          <GameTitleInput id="create-game-title" onChange={this.onInputChange} onKeyDown={this.onInputKeyDown}/>
        </NewGameForm>
        <Footer>
          <Button onClick={this.props.onRequestClose} text="back" />
          <Button onClick={this.createGame} text="start new game" />
        </Footer>
      </Wrapper>
    )
  }
}

StartNewGame.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired
}

export default StartNewGame
