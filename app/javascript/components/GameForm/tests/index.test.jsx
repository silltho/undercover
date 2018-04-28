import React from 'react'
import { mount } from 'enzyme'

import GameForm from '../index'
import {
  Wrapper,
  RoomCodeInput
} from '../Styles'

const defaultProps = {
  joinGame: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <GameForm {...props} />
)

describe('<GameForm />', () => {
  it('should render the <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })

  it('should update gamecode when the <RoomCodeInput> changes', () => {
    const renderedComponent = renderComponent()
    const evt = {
      target: { value: 'test1234' }
    }
    renderedComponent.find(RoomCodeInput).simulate('change', evt)
    expect(renderedComponent.state().gamecode).toEqual(evt.target.value)
  })

  it('should submit form if enter is pressed', () => {
    const renderedComponent = renderComponent()
    const evt = {
      key: 'Enter'
    }
    const gamecode = 'testtitle123'
    renderedComponent.setState({ gamecode })
    renderedComponent.find(RoomCodeInput).simulate('keyDown', evt)
    expect(defaultProps.joinGame).toHaveBeenCalledWith(gamecode)
  })

  it('should not submit form if any other key is pressed', () => {
    const renderedComponent = renderComponent()
    const evt = {
      key: 'A'
    }
    renderedComponent.instance().createGame = jest.fn()
    renderedComponent.find(RoomCodeInput).simulate('keyDown', evt)
    expect(renderedComponent.instance().createGame).toHaveBeenCalledTimes(0)
  })
})
