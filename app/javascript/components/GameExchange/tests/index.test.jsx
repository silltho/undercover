import React from 'react'
import { mount } from 'enzyme'

import GameExchange from '../index'


const defaultProps = {
  endExchange: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <GameExchange {...props} />
)

describe('<GameExchange />', () => {
  it('should render a <div>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('div').length).toEqual(3)
  })
})
