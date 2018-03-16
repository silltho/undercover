import React from 'react'
import { shallow } from 'enzyme'

import IconFont, { ICONS } from '../index'

const defaultProps = {
  icon: ICONS.home
}

const renderComponent = (props = defaultProps) => shallow(
  <IconFont {...props} />
)

describe('<IconFont>', () => {
  it('should render a <span>', () => {
    const renderedComponent = renderComponent()
	  expect(renderedComponent.find('span').length).toEqual(1)
  })
})
