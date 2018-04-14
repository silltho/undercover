import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import {
  Modal,
  ModalBody,
  Overlay,
  Tape
} from './Styles'

class PlayerInformationModal extends React.PureComponent {
  render() {
    const {
      playerInformation,
      onRequestHide
    } = this.props

    const last = playerInformation.get('informations').last()

    return (
      <Overlay>
        <Modal>
          <Tape onClick={onRequestHide}>Remove</Tape>
          <ModalBody>
            <span>{last.get('name')}</span>
            <span>is {last.get('role')}</span>
            <span>and {last.get('changed_party') ? 'disloyal' : 'loyal'}</span>
          </ModalBody>
        </Modal>
      </Overlay>
    )
  }
}

PlayerInformationModal.defaultProps = {
}

PlayerInformationModal.propTypes = {
  playerInformation: PropTypes.instanceOf(Map).isRequired,
  onRequestHide: PropTypes.func.isRequired
}

export default PlayerInformationModal
