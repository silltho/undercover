import React from 'react'
import { mount } from 'enzyme'

import Header from '../index'
import { Wrapper } from '../Styles'

const defaultProps = {}

const renderComponent = (props = defaultProps) => mount(
  <Header {...props} />
)

describe('<Header />', () => {
  it('should render the <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })
})
