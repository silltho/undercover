import React from 'react'
import { mount } from 'enzyme'

import { Wrapper } from '../Styles'

import GamePhaseWrapper from '../index'

const defaultProps = {
  ready: false,
  phaseKey: 'testphase'
}

const renderComponent = (props = defaultProps) => mount(
  <GamePhaseWrapper {...props}>
    <span>test</span>
  </GamePhaseWrapper>
)

describe('<GamePhaseWrapper />', () => {
  it('should render <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })
})
