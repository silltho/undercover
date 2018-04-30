import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import PlayerInformationModal from '../index'
import {
  Overlay
} from '../Styles'

const defaultProps = {
  onRequestHide: () => {},
  playerInformation: fromJS({
    informations: [{
      role: 'role',
      name: 'name',
      party_changed: true
    }]
  })
}

const renderComponent = (props = defaultProps) => mount(
  <PlayerInformationModal {...props} />
)

describe('<PlayerInformationModal />', () => {
  it('should render the <Overlay>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Overlay).length).toEqual(1)
  })
})
