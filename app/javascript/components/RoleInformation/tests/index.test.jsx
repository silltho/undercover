import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import { Content } from 'styles/components'

import RoleInformation from '../index'

const defaultProps = {
  player: fromJS({}),
  victims: fromJS([]),
  onSelectTarget: () => {},
  onRequestHide: () => {},
  roleDetails: fromJS({})
}

const renderComponent = (props = defaultProps) => mount(
  <RoleInformation {...props} />
)

describe('<RoleOverview />', () => {
  it('should render <Content>, <Footer>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Content).length).toEqual(1)
  })
})
