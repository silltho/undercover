import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import PlayersList from '../index'
import {
  Wrapper,
  PlayerItem
} from '../Styles'

const defaultProps = {
  players: fromJS([])
}

const renderComponent = (props = defaultProps) => mount(
  <PlayersList {...props} />
)

describe('<PlayersList />', () => {
  it('should render the <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })

  it('should render mutliple <PlayerItem>', () => {
    const props = {
      ...defaultProps,
      players: fromJS([
        { id: '1', codename: 'player1' },
        { id: '2', codename: 'player2' }
      ])
    }
    const renderedComponent = renderComponent(props)
    expect(renderedComponent.find(PlayerItem).length).toEqual(props.players.size)
  })
})
