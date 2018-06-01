import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { getImageByFraction } from 'config/fractionImages'

import {
  Modal,
  ModalBody,
  Overlay,
  Tape,
  FractionImage,
  CenteredText
} from './Styles'

class PartyChangedModal extends React.PureComponent {
  render() {
    const {
      player,
      onRequestHide
    } = this.props

    const fractionImage = getImageByFraction(player.get('party'))

    return (
      <Overlay>
        <Modal>
          <Tape onClick={onRequestHide}>Remove</Tape>
          <ModalBody>
            <CenteredText>You are now part of the</CenteredText>
            <FractionImage src={fractionImage} />
            <CenteredText>{player.get('party')}</CenteredText>
          </ModalBody>
        </Modal>
      </Overlay>
    )
  }
}

PartyChangedModal.defaultProps = {
}

PartyChangedModal.propTypes = {
  player: PropTypes.instanceOf(Map).isRequired,
  onRequestHide: PropTypes.func.isRequired
}

export default PartyChangedModal
