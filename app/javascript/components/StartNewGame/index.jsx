import React from 'react'
import PropTypes from 'prop-types'
import Footer from 'components/Footer'
import Button from 'components/Button'
import {
  Wrapper,
  Title,
  NewGameForm,
  GameTitleInput,
  TitleLine,
  TitleText
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
        <Title>
          <TitleLine />
          <TitleText>
            New<br />Game
          </TitleText>
          <TitleLine right />
        </Title>
        <NewGameForm>
          <label htmlFor="create-game-title">Game Title:</label>
          <GameTitleInput id="create-game-title" onChange={this.onInputChange} onKeyDown={this.onInputKeyDown}/>
          <label htmlFor="create-game-private">Private:</label>
          <input id="create-game-private" type="checkbox" />
        </NewGameForm>
        <Footer>
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
