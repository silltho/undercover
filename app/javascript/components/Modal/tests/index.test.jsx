import React from 'react'
import { mount } from 'enzyme'
import ReactModal from 'react-modal'

import Modal from '../index'

const defaultProps = {
  isOpen: true,
  title: 'test',
  onRequestClose: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <Modal {...props} />
)

describe('<Modal />', () => {
  it('should render the <ReactModal>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(ReactModal).length).toEqual(1)
  })
})
