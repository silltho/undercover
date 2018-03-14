import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'

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
    expect(renderedComponent.find(Header).length).toEqual(1)
    expect(renderedComponent.find(Content).length).toEqual(1)
    expect(renderedComponent.find(Footer).length).toEqual(1)
  })
})
