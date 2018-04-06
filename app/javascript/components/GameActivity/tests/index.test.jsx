import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import RoleOverview from 'components/RoleOverview'
import RoleInformation from 'components/RoleInformation'
import TargetSelection from 'components/TargetSelection'

import GameActivity from '../index'

const defaultProps = {
  game: fromJS({
    players: []
  }),
  player: fromJS({
    codename: 'test123',
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

  it('should showTargetSelection', () => {
    const renderedComponent = renderComponent()
    renderedComponent.instance().showTargetSelection()
    renderedComponent.update()
    expect(renderedComponent.find(TargetSelection).length).toEqual(1)
  })

  it('should showRoleOverview', () => {
    const renderedComponent = renderComponent()
    renderedComponent.instance().showRoleOverview()
    renderedComponent.update()
    expect(renderedComponent.find(RoleOverview).length).toEqual(1)
  })

  it('should showRoleInformation', () => {
    const renderedComponent = renderComponent()
    renderedComponent.instance().showRoleInformation()
    renderedComponent.update()
    expect(renderedComponent.find(RoleInformation).length).toEqual(1)
  })

  it('should selectTarget', () => {
    const targetId = '1234'
    const props = {
      ...defaultProps,
      useSkill: jest.fn()
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.instance().showRoleOverview = jest.fn()
    renderedComponent.instance().selectTarget(targetId)
    expect(props.useSkill).toHaveBeenCalledWith(targetId)
    expect(renderedComponent.instance().showRoleOverview).toHaveBeenCalledTimes(1)
    expect(renderedComponent.find(RoleOverview).length).toEqual(1)
  })
})
