import React from 'react'
import PropTypes from 'prop-types'
import IconFont, { ICONS } from 'components/IconFont'
import {
  BorderContainer,
  Content,
  BorderContainerFooter,
  BorderContainerTitel,
  Action
} from 'styles/components'


class GameExchange extends React.PureComponent {
  render() {
    const {
      endExchange
    } = this.props

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>Exchange</BorderContainerTitel>
            <IconFont icon={ICONS.home} />
            <BorderContainerFooter>
              <Action onClick={endExchange}>
                next
              </Action>
            </BorderContainerFooter>
          </BorderContainer>
        </Content>
      </React.Fragment>
    )
  }
}

GameExchange.propTypes = {
  endExchange: PropTypes.func.isRequired
}

export default GameExchange
