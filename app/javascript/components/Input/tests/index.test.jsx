import React from 'react'
import { mount } from 'enzyme'

import Button from '../index'

const defaultProps = {
  text: 'test123',
  onClick: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <Button {...props} />
)

describe('<CornerButton />', () => {
  it('should render an <button> tag', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find('button').length).toEqual(1)
  })
})
