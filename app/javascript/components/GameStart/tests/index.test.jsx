import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import { Content } from 'styles/components'

import GamesStart from '../index'

const defaultProps = {
  player: fromJS({}),
  game: fromJS({
    party_distribution: {}
  }),
  startGame: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <GamesStart {...props} />
)

describe('<GamesStart />', () => {
  it('should render <Header>, <Content>, <Footer>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Content).length).toEqual(1)
  })
})
