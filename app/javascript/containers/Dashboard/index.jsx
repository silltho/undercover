import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import LogoImg from 'assets/images/palm_tree.png'
import { GameChannel, UserChannel } from 'services/channels'
import Button from 'components/Button'
import FadeIn from 'components/Animations/FadeIn'
import JoinGameForm from 'components/JoinGameForm'
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
            <JoinGameForm joinGame={this.props.joinGame} wrongGameCode={this.props.app.get('showWrongGamecode')} />
            <Button text="create new game" onClick={this.props.createGame} />
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
  joinGame: (gameCode) => {
    GameChannel.joinGameChannel(gameCode)
    UserChannel.joinGame(gameCode)
  }
})

const mapStateToProps = (state) => ({
  app: state.get('App')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
