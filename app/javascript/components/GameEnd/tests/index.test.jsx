import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import { Content } from 'styles/components'

import GameEnd from '../index'

const defaultProps = {
  endInformation: fromJS({}),
  resetGame: () => {}
}

const renderComponent = (props = defaultProps) => mount(
  <GameEnd {...props} />
)

describe('<GameEnd />', () => {
  it('should render <Content>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Content).length).toEqual(1)
  })
})
