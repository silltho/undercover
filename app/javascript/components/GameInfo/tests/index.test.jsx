import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import RoundInfo from 'components/RoundInfo'
import Flip from 'components/Animations/Flip'

import GameInfo from '../index'

const defaultProps = {
  roundInformations: fromJS({
    1: {
      party_distribution: {
        Mafia: 1,
        Town: 1,
        Anarchists: 0,
        Prisoners: 0,
        Dead: 0
      },
      infos: [
        {
          role: 'godfather',
          info_text: 'A citizen declined a whole bunch of money.'
        },
        {
          role: 'spy',
          info_text: 'Someone got spied.'
        }
      ]
    }
  }),
  readInfos: () => {},
  player: fromJS({
    state: 'alive'
  }),
  game: fromJS({
    round: 0
  })
}

const renderComponent = (props = defaultProps) => shallow(
  <GameInfo {...props} />
)

describe('<GameInfo />', () => {
  it('should render <Flip>', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.find(Flip).length).toEqual(1)
  })

  it('should switchToDay', () => {
    const props = {
      ...defaultProps,
      switchToDay: jest.fn(),
      roundInformation: fromJS({
        0: {},
        1: {},
        2: {}
      })
    }
    const renderedComponent = renderComponent(props)
    renderedComponent.find(RoundInfo).prop('onSwitchToDay')('1')
    expect(renderedComponent.state().selectedDay).toEqual('1')
  })
})
