import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import FractionImages from 'config/fractionImages'
import Flip from 'components/Animations/Flip'
import CornerButton from 'components/CornerButton'
import IconFont, { ICONS } from 'components/IconFont'
import {
  BorderContainer,
  Content,
  BorderContainerTitel,
  Scrollable
} from 'styles/components'
import DayButton from './DayButton'
import {
  DayButtonContainer,
  Wrapper,
  NoInfosMessage,
  InfoList,
  BottomDawnContainer,
  Distribution,
  DistributionSection,
  Fraction,
  FractionImg
} from './Styles'

class GameInfo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: (this.props.roundInformation.size - 1).toString()
    }
  }

  componentDidMount() {
    if (this.buttonContainer) {
      this.buttonContainer.scrollLeft = this.buttonContainer.scrollWidth
    }
  }

  setButtonContainerRef = (container) => {
    this.buttonContainer = container
  }

  switchToDay = (day) => {
    this.setState({ selectedDay: day })
  }

  renderInfo = (info, index) => (
    <li key={`info_${index}`}>{info}</li>
  )

  renderDayButton = (day) => {
    const isActive = this.state.selectedDay === day
    return (
      <DayButton
        key={`day_${day}`}
        switchToDay={this.switchToDay}
        day={day}
        active={isActive}
      />)
  }

  renderRoundInformation = () => {
    const {
      readInfos,
      roundInformation,
      game
    } = this.props

    const day = (parseInt(this.state.selectedDay, 10) + 1)
    const infos = roundInformation.get(this.state.selectedDay, [])
    const renderedInfos = infos.map(this.renderInfo)
    const renderedDayButtons = roundInformation.keySeq().map(this.renderDayButton)
    const distribution = game.get('party_distribution')

    return (
      <Wrapper key={`round-information-${day}`}>
        <Content>
          <BorderContainer>
            <BorderContainerTitel>
              Dawn {day}
            </BorderContainerTitel>
            <Distribution>
              <DistributionSection>
                <Fraction><FractionImg src={FractionImages.MAFIA} />: {distribution.get('Mafia')}</Fraction>
                <Fraction><FractionImg src={FractionImages.TOWN} />: {distribution.get('Town')}</Fraction>
                <Fraction><FractionImg src={FractionImages.ANARCHIST} />: {distribution.get('Anarchists')}</Fraction>
              </DistributionSection>
              <DistributionSection>
                <Fraction><IconFont icon={ICONS.poison} />: {distribution.get('Dead')}</Fraction>
                <Fraction><IconFont icon={ICONS.handcuffs} />: {distribution.get('Prisoners')}</Fraction>
              </DistributionSection>
            </Distribution>
            {renderedInfos.size > 0 ? (
              <Scrollable>
                <InfoList>
                  {renderedInfos}
                </InfoList>
              </Scrollable>
            ) : (<NoInfosMessage>-- no infos for this day --</NoInfosMessage>)
            }
            <BottomDawnContainer>
              {renderedDayButtons.size > 0 ?
                (
                  <DayButtonContainer innerRef={this.setButtonContainerRef}>
                    {renderedDayButtons}
                  </DayButtonContainer>
                ) : null
              }
            </BottomDawnContainer>
          </BorderContainer>
          <CornerButton right bottom onClickAction={readInfos}>
            <IconFont icon={ICONS.checkmark} />
          </CornerButton>
        </Content>
      </Wrapper>
    )
  }

  render() {
    return (
      <Flip>
        {this.renderRoundInformation()}
      </Flip>
    )
  }
}

GameInfo.defaultProps = {
  round: 0
}

GameInfo.propTypes = {
  game: PropTypes.instanceOf(Map).isRequired,
  round: PropTypes.number,
  readInfos: PropTypes.func.isRequired,
  roundInformation: PropTypes.instanceOf(Map).isRequired
}

export default GameInfo
