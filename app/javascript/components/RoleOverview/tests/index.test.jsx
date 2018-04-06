import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import { Content } from 'styles/components'

import RoleOverview from '../index'

const defaultProps = {
  pseudonym: 'test123',
  skipPhase: () => {},
  showTargetSelection: () => {},
  showRoleInformation: () => {},
  showRoleCovert: () => {},
  roleDetails: fromJS({
    name: 'test',
    active: 'skillName'
  })
}

const renderComponent = (props = defaultProps) => mount(
  <RoleOverview {...props} />
)

describe('<RoleOverview />', () => {
  it('should render <Header>, <Content>, <Footer>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Content).length).toEqual(1)
  })
})
