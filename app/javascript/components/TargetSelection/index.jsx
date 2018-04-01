import React from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import Content from 'components/Content'
import IconFont, { ICONS } from 'components/IconFont'
import {
  BorderContainer,
  BorderContainerTitel,
  BorderContainerAction,
  Scrollable
} from 'styles/components'
import VictimsItem from './VictimItem'

class TargetSelection extends React.PureComponent {
  render() {
    const {
      onRequestHide,
      onSelectTarget,
      victims,
      player,
      currentTarget
    } = this.props

    const renderedVictims = victims
      .filter((victim) => victim.get('id') !== player.get('id'))
      .map((victim) => (
        <VictimsItem
          key={`victim-${victim.get('id')}`}
          victim={victim}
          useSkill={onSelectTarget}
          isTarget={victim.get('id') === currentTarget.get('id')}
        />
      ))

    return (
      <React.Fragment>
        <Content>
          <BorderContainer>
            <BorderContainerTitel><IconFont icon={ICONS.night} /></BorderContainerTitel>
            <Scrollable>
              {renderedVictims}
            </Scrollable>
            <BorderContainerAction onClick={onRequestHide}>back</BorderContainerAction>
          </BorderContainer>
        </Content>
      </React.Fragment>
    )
  }
}

TargetSelection.defaultProps = {
  currentTarget: Map()
}

TargetSelection.propTypes = {
  player: PropTypes.instanceOf(Map).isRequired,
  victims: PropTypes.instanceOf(List).isRequired,
  onSelectTarget: PropTypes.func.isRequired,
  onRequestHide: PropTypes.func.isRequired,
  currentTarget: PropTypes.instanceOf(Map)
}

export default TargetSelection
