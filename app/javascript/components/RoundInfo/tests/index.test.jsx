import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import { Content } from 'styles/components'

import RoundInfo from '../index'

const defaultProps = {
  roundInformation: fromJS({
    party_distribution: {
      Mafia: 1,
      Town: 1,
      Anarchists: 0,
      Prisoners: 0,
      Dead: 0
    },
    infos: [
      {
        role: 'godfather',
        info_text: 'A citizen declined a whole bunch of money.'
      },
      {
        role: 'spy',
        info_text: 'Someone got spied.'
      }
    ]
  }),
  days: fromJS([]),
  currentDay: 1,
  onSwitchToDay: () => {}
}

const renderComponent = (props = defaultProps) => mount(
  <RoundInfo {...props} />
)

describe('<RoundInfo />', () => {
  it('should render <Content>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Content).length).toEqual(1)
  })

  it('should render inactive DayButton', () => {
    const day = '2'
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
})
