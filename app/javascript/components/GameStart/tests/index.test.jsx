import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import GamesStart from '../index'
import { Wrapper } from '../Styles'

const defaultProps = {
  currentPlayer: fromJS({}),
  roleDetails: fromJS({}),
  players: fromJS([]),
  startGame: jest.fn(),
  partyMembers: fromJS({})
}

const renderComponent = (props = defaultProps) => mount(
  <GamesStart {...props} />
)

describe('<GamesStart />', () => {
  it('should render the <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })
})
