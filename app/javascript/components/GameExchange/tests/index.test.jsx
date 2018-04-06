import React from 'react'
import { mount } from 'enzyme'

import GameExchange from '../index'
import { Content } from 'styles/components'


const defaultProps = {
  endExchange: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <GameExchange {...props} />
)

describe('<GameExchange />', () => {
  it('should render a <Content>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Content).length).toEqual(1)
  })
})
