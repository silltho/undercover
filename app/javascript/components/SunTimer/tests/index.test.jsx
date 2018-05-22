import React from 'react'
import { mount } from 'enzyme'

import SunTimer from '../index'
import { SunBody } from '../Styles'

const defaultProps = {
  text: 'test123',
  onClick: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <SunTimer {...props} />
)

describe('<CornerButton />', () => {
  it('should render an <SunBody> tag', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(SunBody).length).toEqual(1)
  })
})
