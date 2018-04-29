import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import LogoImg from 'assets/images/palm_tree.png'
import { GameChannel, UserChannel } from 'services/channels'
import Button from 'components/Button'
import FadeIn from 'components/Animations/FadeIn'
import GameForm from 'components/GameForm'
import {
  Header
} from 'styles/components'
import {
  Wrapper,
  ButtonContainer,
  Title,
  Logo
} from './Styles'

class Dashboard extends React.PureComponent {
  render() {
    const { app } = this.props

    return (
      <Wrapper>
        <FadeIn>
          <Header>
            <Title>
              <span>Under</span>
              <Logo src={LogoImg} />
              <span>Cover</span>
            </Title>
          </Header>
          <ButtonContainer>
            <GameForm
              joinGame={this.props.joinGame}
              createGame={this.props.createGame}
              wrongGameCode={this.props.app.get('showWrongGamecode')}
            />
          </ButtonContainer>
        </FadeIn>
      </Wrapper>
    )
  }
}

Dashboard.defaultProps = {
}

Dashboard.propTypes = {
  app: PropTypes.instanceOf(Map).isRequired,
  createGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired
}

export const mapDispatchToProps = () => ({
  createGame: UserChannel.createGame,
  joinGame: (gameCode, nickname) => {
    GameChannel.joinGameChannel(gameCode)
    UserChannel.joinGame(gameCode, nickname)
  }
})

const mapStateToProps = (state) => ({
  app: state.get('App')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
