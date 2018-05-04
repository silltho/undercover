import React from 'react'
import { mount } from 'enzyme'

import CornerButton from '../index'
import { Wrapper } from '../Styles'

const defaultProps = {
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

  it('should handleOnClick', () => {
    const props = {
      ...defaultProps,
      onClickAction: jest.fn()
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.find(Wrapper).prop('onClick')()
    expect(props.onClickAction).toHaveBeenCalled()
  })
})
