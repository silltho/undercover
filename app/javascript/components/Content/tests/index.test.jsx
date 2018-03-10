import React from 'react'
import { mount } from 'enzyme'

import Content from '../index'

const defaultProps = {
  children: null
}

const renderComponent = (props = defaultProps) => mount(
  <Content {...props} />
)

describe('<Content />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('div').length).toEqual(1)
  })
})
