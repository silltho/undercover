/**
 * Testing IngestContentModal component
 */

import React from 'react'
import {shallow} from 'enzyme'
import 'utils/jest'

import IngestContentModal from '../'
import {ModalWrapper} from '../Styles'

const renderComponent = (props = {}) => shallow(
  <IngestContentModal {...props} />
)

const defaultProps = {
  onRequestClose: () => {},
  isOpen: true,
  title: 'test-modal'
}

describe('<IngestContentModal />', () => {
  it('should render Content <ModalWrapper />', () => {
    const renderedComponent = renderComponent(defaultProps)
    expect(renderedComponent.find(ModalWrapper).length).toEqual(1)
  })

  it('should render <ModalWrapper /> with default width', () => {
    const renderedComponent = shallow(<ModalWrapper/>)
    expect(renderedComponent).toHaveStyleRule('width', '55rem')
  })
})
