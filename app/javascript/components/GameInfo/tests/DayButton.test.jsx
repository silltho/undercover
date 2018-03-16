import React from 'react'
import { mount } from 'enzyme'

import DayButton from '../DayButton'
import {
  DayButtonWrapper
} from '../Styles'

const defaultProps = {
  active: false,
  day: '1',
  switchToDay: () => {}
}

const renderComponent = (props = defaultProps) => mount(
  <DayButton {...props} />
)

describe('<DayButton />', () => {
  it('should render <DayButtonWrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(DayButtonWrapper).length).toEqual(1)
  })
})
