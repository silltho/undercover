import React from 'react'
import { mount } from 'enzyme'

import GameForm from '../index'
import {
  Form
} from '../Styles'

const defaultProps = {
  createGame: () => {},
  joinGame: () => {},
  wrongGameCode: false,
  fullGame: false
}

const renderComponent = (props = defaultProps) => mount(
  <GameForm {...props} />
)

describe('<GameForm />', () => {
  it('should render the <Form>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Form).length).toEqual(1)
  })

  it('should createGame', () => {
    const nickname = 'testnickname'
    const props = {
      ...defaultProps,
      createGame: jest.fn()
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.instance().setState({ nickname })
    renderedComponent.instance().createGame()
    expect(props.createGame).toHaveBeenCalledWith(nickname)
  })

  it('should not createGame', () => {
    const props = {
      ...defaultProps,
      createGame: jest.fn()
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.instance().createGame()
    expect(props.createGame).toHaveBeenCalledTimes(0)
  })

  it('should joinGame', () => {
    const nickname = 'test-nickname'
    const gamecode = 'test-gamecode'
    const props = {
      ...defaultProps,
      joinGame: jest.fn()
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.instance().setState({ nickname, gamecode })
    renderedComponent.instance().joinGame()
    expect(props.joinGame).toHaveBeenCalledWith(gamecode, nickname)
  })

  it('should not joinGame', () => {
    const props = {
      ...defaultProps,
      joinGame: jest.fn()
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.instance().joinGame()
    expect(props.joinGame).toHaveBeenCalledTimes(0)
  })

  it('should update gamecode when the <Input> changes', () => {
    const renderedComponent = renderComponent()
    const evt = {
      target: { value: 'test1234' }
    }
    renderedComponent.find('input#input_gamecode').simulate('change', evt)
    expect(renderedComponent.state().gamecode).toEqual(evt.target.value)
  })

  it('should update nickname when the <Input> changes', () => {
    const renderedComponent = renderComponent()
    const evt = {
      target: { value: 'test1234' }
    }
    renderedComponent.find('input#input_nickname').simulate('change', evt)
    expect(renderedComponent.state().nickname).toEqual(evt.target.value)
  })

  it('should not submit form if any other key is pressed', () => {
    const renderedComponent = renderComponent()
    const evt = {
      key: 'A'
    }
    renderedComponent.instance().createGame = jest.fn()
    renderedComponent.find('input#input_gamecode').simulate('keyDown', evt)
    expect(renderedComponent.instance().createGame).toHaveBeenCalledTimes(0)
  })


  it('should have componentWillReceiveProps', () => {

    const props = {
      ...defaultProps,
      wrongGameCode: false
    }
    const nextProps = {
      ...props,
      wrongGameCode: true
    }
    const renderedComponent = renderComponent()
    renderedComponent.instance().componentWillReceiveProps(nextProps)
    expect(renderedComponent.state().roomCodeErrorMessage).toEqual('invalid Gamecode')
  })
})
