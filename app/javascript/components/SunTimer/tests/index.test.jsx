import React from 'react'
import { mount } from 'enzyme'

import SunTimer from '../index'
import { SunBody } from '../Styles'

const defaultProps = {
  text: 'test123',
  onClick: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <SunTimer {...props} />
)

describe('<SunTimer />', () => {
  it('should render an <SunBody> tag', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(SunBody).length).toEqual(1)
  })

  it('should componentWillMount', () => {
    const renderedComponent = renderComponent()
    jest.useFakeTimers()
    renderedComponent.instance().componentWillMount()
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0)
    jest.runAllTimers()
    expect(renderedComponent.state().animationStarted).toEqual(true)
  })
})
