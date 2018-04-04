import styled from 'styled-components'
import {
  DARK_BLUE,
  LOGO_FONT,
  PINK
} from './variables'

export const Scrollable = styled.div`
  width: 100%;
  overflow-y: scroll;
`

export const BorderContainer = styled.div`
  border: 2px solid ${PINK};
  padding: 1.5rem 1.5rem 3rem 1.5rem;
  position: relative;
  margin: 1rem 0 2rem 0;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const BorderContainerTitel = styled.span`
  font-family: ${LOGO_FONT};
  font-size: 2rem;
  background-color: ${DARK_BLUE};
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%) translateY(-50%);
`

export const BorderContainerFooter = styled.div`
  display: flex;
  text-transform: uppercase;
  color: ${PINK};
  border: 2px solid ${PINK};
  background-color: ${DARK_BLUE};
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2rem;
`

export const Action = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`
