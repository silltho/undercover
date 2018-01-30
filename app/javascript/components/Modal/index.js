import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import {
  ModalWrapper,
  Header,
  CloseIcon,
	CloseIconWrapper
} from './Styles'

const overlay = {
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'absolute',
  zIndex: 10
}

const content = {
  top: 'auto',
  left: 'auto',
  right: 'auto',
  bottom: 'auto',
  alignSelf: 'center',
  padding: 0,
  borderRadius: 0,
  border: 'none',
  overflow: 'initial'
}

class Modal extends React.PureComponent {
	componentWillMount() {
		ReactModal.setAppElement('body')
	}

  render() {
    const {
      isOpen,
      title,
      children,
      onRequestClose,
      width
    } = this.props

    const style = {
      overlay,
      content
    }

    return (
      <ReactModal
        onRequestClose={onRequestClose}
        contentLabel={title}
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        style={style}
        {...this.props}
      >
        <ModalWrapper width={width}>
          <Header>
            {title}
            <CloseIconWrapper>
              <CloseIcon name="cross" onClick={onRequestClose} />
            </CloseIconWrapper>
          </Header>
          {children}
        </ModalWrapper>
      </ReactModal>
    )
  }
}

Modal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.string
}

Modal.defaultProps = {
  isOpen: false
}

export default Modal
export * from './Styles'
