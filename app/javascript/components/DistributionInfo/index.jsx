import React from 'react'
import PropTypes from 'prop-types'
import FractionImages from 'config/fractionImages'
import IconFont, { ICONS } from 'components/IconFont'
import { Map } from 'immutable'
import {
  Distribution,
  DistributionSection,
  Fraction,
  FractionImg
} from './Styles'

class DistributionInfo extends React.PureComponent {
  render() {
    const {
      distribution
    } = this.props

    return (
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
    )
  }
}

DistributionInfo.defaultProps = {
}

DistributionInfo.propTypes = {
  distribution: PropTypes.instanceOf(Map).isRequired
}

export default DistributionInfo
