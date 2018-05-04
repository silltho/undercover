import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import { Content } from 'styles/components'

import RoleOverview from '../index'

const defaultProps = {
  showTargetSelection: () => {},
  showRoleInformation: () => {},
  skipPhase: () => {},
  player: fromJS({
    role: {
      name: 'test',
      active: 'skillName'
    }
  })
}

const renderComponent = (props = defaultProps) => mount(
  <RoleOverview {...props} />
)

describe('<RoleOverview />', () => {
  it('should render <Content>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Content).length).toEqual(1)
  })
})
