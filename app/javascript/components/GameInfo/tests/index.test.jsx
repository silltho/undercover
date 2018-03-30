import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import Header from 'components/Header'
import Content from 'components/Content'
import Footer from 'components/Footer'

import DayButton from '../DayButton'
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

  it('should render inactive DayButton', () => {
    const day = '1'
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

  it('should render Info', () => {
    const info = 'test123'
    const renderedComponent = renderComponent()
    const renderedInfo = mount(renderedComponent.instance().renderInfo(info))
    expect(renderedInfo.text()).toEqual(info)
  })

  it('should setButtonContainerRef', () => {
    const containerRef = 'test123'
    const renderedComponent = renderComponent()
    renderedComponent.instance().setButtonContainerRef(containerRef)
    expect(renderedComponent.instance().buttonContainer).toEqual(containerRef)
  })

  it('should show infos and daybuttons', () => {
    const props = {
      ...defaultProps,
      roundInformation: fromJS({
        0: ['test123', 'blahblah']
      })
    }
    const renderedComponent = renderComponent(props)
    expect(renderedComponent.find(DayButton).length).toEqual(1)
    expect(renderedComponent.find('li').length).toEqual(2)
  })

  it('should switchToDay', () => {
    const props = {
      ...defaultProps,
      switchToDay: jest.fn(),
      roundInformation: fromJS({
        0: ['test123', 'blahblah']
      })
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.find(DayButton).first().simulate('click')
    expect(renderedComponent.state().selectedDay).toEqual('0')
  })
})
