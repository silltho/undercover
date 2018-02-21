import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'

import GameActivity from '../index'
import {
  RoleName,
  RoleImage
} from '../Styles'

const defaultProps = {
  roleDetails: fromJS({
    name: 'testRoleName',
    image: 'test/img/test'
  }),
  endGame: jest.fn()
}

const renderComponent = (props = defaultProps) => mount(
  <GameActivity {...props} />
)

describe('<GameActivity />', () => {
  it('should render a <RoleImage> and <RoleName>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(RoleName).length).toEqual(1)
    expect(renderedComponent.find(RoleImage).length).toEqual(1)
  })
})
