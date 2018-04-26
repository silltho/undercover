import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import VictimItem from '../VictimItem'
import {
  VictimItemWrapper
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
})
