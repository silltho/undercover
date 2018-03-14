import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'

import GameInfo from '../index'

const defaultProps = {
  day: 1,
  roundInformation: fromJS({}),
  readInfos: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <GameInfo {...props} />
)

describe('<GameInfo />', () => {
  it('should render <Header>, <Content>, <Footer>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Header).length).toEqual(1)
    expect(renderedComponent.find(Content).length).toEqual(1)
    expect(renderedComponent.find(Footer).length).toEqual(1)
  })
})
