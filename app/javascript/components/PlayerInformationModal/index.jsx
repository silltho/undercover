import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'

import {
  Modal,
  ModalBody,
  Overlay,
  Tape,
  Underlined
} from './Styles'

class PlayerInformationModal extends React.PureComponent {
  render() {
    const {
      playerInformation,
      onRequestHide
    } = this.props

    const last = playerInformation.last()

    return (
      <Overlay>
        <Modal>
          <Tape onClick={onRequestHide}>Remove</Tape>
          <ModalBody>
            <div>
              <Underlined>{last.get('name')}</Underlined>
              <span> is</span>
            </div>
            <Underlined>{last.get('role')}</Underlined>
            <span>and part of the</span>
            <Underlined>{last.get('party')}</Underlined>
          </ModalBody>
        </Modal>
      </Overlay>
    )
  }
}

PlayerInformationModal.defaultProps = {
}

PlayerInformationModal.propTypes = {
  playerInformation: PropTypes.instanceOf(List).isRequired,
  onRequestHide: PropTypes.func.isRequired
}

export default PlayerInformationModal
