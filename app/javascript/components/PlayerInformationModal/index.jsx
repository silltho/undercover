import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import {
  Modal,
  ModalTitel,
  ModalBody,
  ModalButton,
  Overlay,
  Tape
} from './Styles'

class PlayerInformationModal extends React.PureComponent {
  render() {
    const {
      playerInformation,
      onRequestHide
    } = this.props

    return (
      <Overlay>
        <Modal>
          <Tape onClick={onRequestHide}>Remove</Tape>
          <ModalBody>
            {playerInformation.get('informations').toString()}
          </ModalBody>
          {/*<ModalButton onClick={onRequestHide}>close</ModalButton>*/}
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
