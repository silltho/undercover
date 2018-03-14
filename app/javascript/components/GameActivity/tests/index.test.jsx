import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import RoleOverview from 'components/RoleOverview'
import TargetSelection from 'components/TargetSelection'

import GameActivity from '../index'

const defaultProps = {
  game: fromJS({
    players: []
  }),
  player: fromJS({
    role: {
      active: 'skillName'
    }
  }),
  useSkill: () => {},
  allSkillsUsed: () => {}
}

const renderComponent = (props = defaultProps) => mount(
  <GameActivity {...props} />
)

describe('<GameActivity />', () => {
  it('should render the <RoleOverview>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(RoleOverview).length).toEqual(1)
  })

  it('should render the <TargetSelection>', () => {
    const renderedComponent = renderComponent()
    renderedComponent.instance().showTargetSelection()
    renderedComponent.update()
    expect(renderedComponent.find(TargetSelection).length).toEqual(1)
  })
})
