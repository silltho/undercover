import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'
import PlayerStates from 'config/playerStates'

import VictimItem from '../index'
import {
  VictimItemWrapper,
  FractionImage
} from '../Styles'

const defaultProps = {
  victim: fromJS({}),
  useSkill: () => {}
}

const renderComponent = (props = defaultProps) => mount(
  <VictimItem {...props} />
)

describe('<VictimItem />', () => {
  it('should render <VictimItemWrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(VictimItemWrapper).length).toEqual(1)
  })

  it('should render <FractionImage>', () => {
    const props = {
      ...defaultProps,
      victim: fromJS({
        party: 'mafia'
      })
    }
    const renderedComponent = renderComponent(props)
    expect(renderedComponent.find(FractionImage).length).toEqual(1)
  })

  it('should useSkill onClick', () => {
    const id = '123'
    const props = {
      ...defaultProps,
      victim: fromJS({
        id,
        state: PlayerStates.IMPRISONED
      }),
      useSkill: jest.fn()
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.find(VictimItemWrapper).prop('onClick')()
    expect(props.useSkill).toHaveBeenCalledWith(id)
  })

  it('should not useSkill on dead players', () => {
    const props = {
      ...defaultProps,
      victim: fromJS({
        state: PlayerStates.DEAD
      }),
      useSkill: jest.fn()
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.find(VictimItemWrapper).prop('onClick')()
    expect(props.useSkill).toHaveBeenCalledTimes(0)
  })
})
