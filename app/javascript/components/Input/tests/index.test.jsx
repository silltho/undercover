import React from 'react'
import { mount } from 'enzyme'

import Input from '../index'
import { Wrapper } from '../Styles'

const defaultProps = {
  onChange: () => {},
  onKeyDown: () => {},
  name: 'test',
  placeholder: 'placeholder',
  type: 'text',
  label: 'label',
  error: 'errormessage'
}

const renderComponent = (props = defaultProps) => mount(
  <Input {...props} />
)

describe('<Input />', () => {
  it('should render <Wrapper>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Wrapper).length).toEqual(1)
  })
})
