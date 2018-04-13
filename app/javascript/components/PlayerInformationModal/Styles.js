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
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`
