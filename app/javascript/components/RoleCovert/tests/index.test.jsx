import React from 'react'
import { mount } from 'enzyme'

import Content from 'components/Content'
import Footer from 'components/Footer'

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
    expect(renderedComponent.find(Footer).length).toEqual(1)
  })
})
