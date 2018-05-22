import React from 'react'
import { mount } from 'enzyme'

import SunTimer from '../index'

const defaultProps = {
  text: 'test123',
  onClick: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <SunTimer {...props} />
)

describe('<CornerButton />', () => {
  it('should render an <button> tag', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('div').length).toEqual(12)
  })
})
