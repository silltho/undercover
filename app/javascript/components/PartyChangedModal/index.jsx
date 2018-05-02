import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import {
  Modal,
  ModalBody,
  Overlay,
  Tape
} from './Styles'

class PartyChangedModal extends React.PureComponent {
  render() {
    const {
      player,
      onRequestHide
    } = this.props

    return (
      <Overlay>
        <Modal>
          <Tape onClick={onRequestHide}>Remove</Tape>
          <ModalBody>
            You are now part of the {player.get('party')}
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
