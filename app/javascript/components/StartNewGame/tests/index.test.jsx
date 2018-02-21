import React from 'react'
import { mount } from 'enzyme'

import StartNewGame from '../index'
import {
  Wrapper,
  GameTitleInput
} from '../Styles'

const defaultProps = {
  onRequestClose: jest.fn(),
  createGame: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <StartNewGame {...props} />
)

describe('<StartNewGame />', () => {
  it('should render the <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })

  it('should update title when the <GameTitleInput> changes', () => {
    const renderedComponent = renderComponent()
    const evt = {
      target: { value: 'test1234' }
    }
    renderedComponent.find(GameTitleInput).simulate('change', evt)
    expect(renderedComponent.state().title).toEqual(evt.target.value)
  })

  it('should submit form if enter is pressed', () => {
    const renderedComponent = renderComponent()
    const evt = {
      key: 'Enter'
    }
    const title = 'testtitle123'
    renderedComponent.setState({ title })
    renderedComponent.find(GameTitleInput).simulate('keyDown', evt)
    expect(defaultProps.createGame).toHaveBeenCalledWith(title)
    expect(defaultProps.onRequestClose).toHaveBeenCalled()
    expect(renderedComponent.state().title).toEqual('')
  })

  it('should not submit form if any other key is pressed', () => {
    const renderedComponent = renderComponent()
    const evt = {
      key: 'A'
    }
    renderedComponent.instance().createGame = jest.fn()
    renderedComponent.find(GameTitleInput).simulate('keyDown', evt)
    expect(renderedComponent.instance().createGame).toHaveBeenCalledTimes(0)
  })
})
