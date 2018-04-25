import React from 'react'
import { mount } from 'enzyme'

import { Content } from 'styles/components'

import CardBack from '../index'

const defaultProps = {
  onRequestHide: () => {}
}

const renderComponent = (props = defaultProps) => mount(
  <CardBack {...props} />
)

describe('<ImageWrapper />', () => {
  it('should render <Content>, <Footer>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Content).length).toEqual(1)
  })
})
