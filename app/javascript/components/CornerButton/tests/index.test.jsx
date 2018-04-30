import React from 'react'
import { mount } from 'enzyme'

import CornerButton from '../index'
import { Wrapper } from '../Styles'

const defaultProps = {
  text: 'test123',
  onClickAction: () => {}
}

const renderComponent = (props = defaultProps) => mount(
  <CornerButton {...props} />
)

describe('<CornerButton />', () => {
  it('should render an <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })
})
