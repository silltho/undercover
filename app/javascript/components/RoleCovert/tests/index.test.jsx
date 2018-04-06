import React from 'react'
import { mount } from 'enzyme'

import { Content } from 'styles/components'

import RoleCovert from '../index'

const defaultProps = {
  onRequestHide: () => {}
}

const renderComponent = (props = defaultProps) => mount(
  <RoleCovert {...props} />
)

describe('<RoleCovert />', () => {
  it('should render <Content>, <Footer>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Content).length).toEqual(1)
  })
})
