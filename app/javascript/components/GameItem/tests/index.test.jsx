import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import GameItem from '../index'
import { Wrapper } from '../Styles'

const defaultProps = {
  game: fromJS({
    id: '123',
    full: false,
    title: 'testtitle',
    players: [
      {},
      {}
    ]
  }),
  joinGame: () => {}
}

const renderComponent = (props = defaultProps) => mount(
  <GameItem {...props} />
)

describe('<GameItem />', () => {
  it('should render the <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })

  it('should join a game', () => {
    const props = {
      ...defaultProps,
      game: fromJS({
        id: '123',
        full: false,
        title: 'testtitle',
        players: [
          {},
          {}
        ]
      }),
      joinGame: jest.fn()
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.instance().joinGame()
    expect(props.joinGame).toHaveBeenCalledWith(props.game.get('id'))
  })


  it('should not join a full game', () => {
    const props = {
      ...defaultProps,
      game: fromJS({
        id: '123',
        full: true,
        title: 'testtitle',
        players: [
          {},
          {}
        ]
      }),
      joinGame: jest.fn()
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.instance().joinGame()
    expect(props.joinGame).toHaveBeenCalledTimes(0)
  })
})
