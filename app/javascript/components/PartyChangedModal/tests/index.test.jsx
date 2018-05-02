import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import PartyChangedModal from '../index'
import {
  Overlay
} from '../Styles'

const defaultProps = {
  onRequestHide: () => {},
  player: fromJS({
    party: 'Mafia'
  })
}

const renderComponent = (props = defaultProps) => mount(
  <PartyChangedModal {...props} />
)

describe('<PartyChangedModal />', () => {
  it('should render the <Overlay>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Overlay).length).toEqual(1)
  })
})
