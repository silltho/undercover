import React from 'react'
import { mount } from 'enzyme'

import GameInfo from '../index'

const defaultProps = {
  day: 1,
  informations: [
    'info1',
    'info2'
  ],
  readInfos: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <GameInfo {...props} />
)

describe('<GameInfo />', () => {
  it('should render a <div>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('div').length).toEqual(3)
  })
})
