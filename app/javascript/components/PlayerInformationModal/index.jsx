import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import {
  Modal,
  Overlay
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
          {
            playerInformation.get('informations')
          }
          <button onClick={onRequestHide}>ok</button>
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
