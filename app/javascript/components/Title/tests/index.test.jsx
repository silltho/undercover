import React from 'react'
import { mount } from 'enzyme'

import Title from '../index'
import { Wrapper } from '../Styles'

const defaultProps = {
	title: 'blahblah'
}

const renderComponent = (props = defaultProps) => mount(
  <Title {...props} />
)

describe('<Title />', () => {
  it('should render the <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })
})
