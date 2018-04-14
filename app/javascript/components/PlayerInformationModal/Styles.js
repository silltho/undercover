import styled from 'styled-components'
import {
  WHITE,
  DARK_BLUE
} from 'styles/variables'

export const Modal = styled.div`
  max-width: 30rem;
  max-height: 30rem;
  height: 100%;
  width: 100%;
  background-color: ${WHITE};
  color: ${DARK_BLUE};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${WHITE};
  box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
`

export const ModalTitel = styled.div`
  font-weight: bold;
  color: ${WHITE};
  background-color: ${DARK_BLUE};
  padding: 0.5rem;
`

export const ModalBody = styled.div`
  flex: 1;
  padding: 0.5rem;
`

export const ModalButton = styled.button`
  color: ${WHITE};
  background-color: ${DARK_BLUE};
  padding: 0.5rem;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`
