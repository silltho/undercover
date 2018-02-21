import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import GamesList from '../index'
import { Wrapper } from '../Styles'

const defaultProps = {
  openGames: fromJS([
    {
      id: '1',
      players: []
    },
    {
      id: '2',
      players: []
    }
  ]),
  onGetOpenGames: jest.fn(),
  joinGame: jest.fn(),
  openStartNewGame: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <GamesList {...props} />
)

describe('<GamesList />', () => {
  it('should render the <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })
})
