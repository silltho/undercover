import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'

import RoleOverview from '../index'

const defaultProps = {
  skipPhase: () => {},
  showTargetSelection: () => {},
	showRoleInformation: () => {},
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
    expect(renderedComponent.find(Header).length).toEqual(1)
    expect(renderedComponent.find(Content).length).toEqual(1)
    expect(renderedComponent.find(Footer).length).toEqual(1)
  })
})
