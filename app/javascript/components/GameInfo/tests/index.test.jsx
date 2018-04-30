import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import { Content } from 'styles/components'

import DayButton from '../DayButton'
import GameInfo from '../index'

const defaultProps = {
  roundInformation: fromJS({}),
  readInfos: () => {},
  game: fromJS({
    party_distribution: {}
  }),
  player: fromJS({
    state: 'alive'
  })
}

const renderComponent = (props = defaultProps) => mount(
  <GameInfo {...props} />
)

describe('<GameInfo />', () => {
  it('should render <Content>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Content).length).toEqual(1)
  })

  it('should render inactive DayButton', () => {
    const day = '1'
    const renderedComponent = renderComponent()
    const dayButton = mount(renderedComponent.instance().renderDayButton(day))
    expect(dayButton.props().active).toEqual(false)
  })

  it('should render active DayButton', () => {
    const day = '1'
    const renderedComponent = renderComponent()
    renderedComponent.setState({ selectedDay: day })
    const dayButton = mount(renderedComponent.instance().renderDayButton(day))
    expect(dayButton.props().active).toEqual(true)
  })

  it('should render Info', () => {
    const info = 'test123'
    const renderedComponent = renderComponent()
    const renderedInfo = mount(renderedComponent.instance().renderInfo(info))
    expect(renderedInfo.text()).toEqual(info)
  })

  it('should switchToDay', () => {
    const props = {
      ...defaultProps,
      switchToDay: jest.fn(),
      roundInformation: fromJS({
        0: ['test123', 'blahblah']
      })
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.find(DayButton).first().simulate('click')
    expect(renderedComponent.state().selectedDay).toEqual('0')
  })
})
