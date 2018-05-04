import styled from 'styled-components'
import {
  WHITE,
  BLACK,
  DARK_BLUE,
  NOTE_FONT,
  MAIN_FONT
} from 'styles/variables'

export const Modal = styled.div`
  position: relative;
  max-width: 30rem;
  max-height: 30rem;
  height: 100%;
  width: 100%;
  background: linear-gradient(#F9EFAF, #F7E98D);
  color: ${BLACK};
  font-family: ${NOTE_FONT};
  display: flex;
  flex-direction: column;
  border: 1px solid ${WHITE};
  padding-top: 2rem;
`

export const Tape = styled.div`
  position: absolute;
  font-family: ${MAIN_FONT};
  text-align: center;
  left: 50%;
  top: -0.5rem;
  width: 90px;
  height: 40px;
  line-height: 40px;
  z-index: 1;
  background-color: rgba(243,245,228);
  border: 2px solid rgba(255,255,255);
  box-shadow: 2px 2px 2px #000;
  transform: rotate(-6deg) translateX(-50%) translateY(-50%);
  opacity: 0.5;
`

export const ModalBody = styled.div`
  flex: 1;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
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

export const Underlined = styled.span`
  text-decoration: underline;
`
