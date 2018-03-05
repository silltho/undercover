import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GameChannel, UserChannel } from 'services/channels'
import Button from 'components/Button'
import JoinGameForm from 'components/JoinGameForm'
import {
  Wrapper,
  ButtonContainer
} from './Styles'

class Dashboard extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <ButtonContainer>
          <JoinGameForm joinGame={this.props.joinGame} />
          <Button text="create new game" onClick={this.props.createGame} />
        </ButtonContainer>
      </Wrapper>
    )
  }
}

Dashboard.defaultProps = {
}

Dashboard.propTypes = {
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

const mapStateToProps = (state) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
