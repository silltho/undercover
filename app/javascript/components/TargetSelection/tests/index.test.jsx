import React from 'react'
import { mount } from 'enzyme'
import { Map } from 'immutable'

import RoleOverview from '../index'

const defaultProps = {
  skipPhase: jest.fn(),
  showTargetSelection: jest.fn(),
  roleDetails: Map()
}

const renderComponent = (props = defaultProps) => mount(
  <RoleOverview {...props} />
)

describe('<RoleOverview />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('div').length).toEqual(1)
  })
})
