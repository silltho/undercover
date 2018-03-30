import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'

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
    expect(renderedComponent.find(Footer).length).toEqual(1)
  })
})
