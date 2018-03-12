import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import {
  VictimItemWrapper
} from './Styles'

class VictimItem extends React.PureComponent {
  useSkill = () => {
    this.props.useSkill(this.props.victim.get('id'))
  }

  render() {
    const {
      victim
    } = this.props

    return (
      <VictimItemWrapper
        role="button"
        onClick={this.useSkill}
      >
        {victim.get('codename')}
      </VictimItemWrapper>
    )
  }
}

VictimItem.defaultProps = {
}

VictimItem.propTypes = {
  victim: PropTypes.instanceOf(Map).isRequired,
  useSkill: PropTypes.func.isRequired
}

export default VictimItem
