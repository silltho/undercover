import styled from 'styled-components'
import {
  DARK_BLUE,
  LOGO_FONT,
  PINK,
  WHITE
} from './variables'

export const BorderContainer = styled.div`
  border: 1px solid ${PINK};
  padding: 1.5rem;
  position: relative;
  margin: 2rem 0;
  display: flex;
  flex: 1;
`

export const BorderContainerTitel = styled.span`
  font-family: ${LOGO_FONT};
  font-size: 2rem;
  background-color: ${DARK_BLUE};
  position: absolute;
  left: 50%;
  top: 0;
  padding: 0 1rem;
  transform: translateX(-50%) translateY(-50%);
`

export const BorderContainerAction = styled.button`
  text-transform: uppercase;
  color: ${WHITE};
  border: 1px solid ${PINK};
  background-color: ${DARK_BLUE};
  padding: 0.5rem 1rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(56%);
`
