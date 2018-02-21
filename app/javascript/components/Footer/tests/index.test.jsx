import React from 'react'
import { mount } from 'enzyme'

import Footer from '../index'

const defaultProps = {
  children: null
}

const renderComponent = (props = defaultProps) => mount(
  <Footer {...props} />
)

describe('<Footer />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('div').length).toEqual(1)
  })
})
