import styled from 'styled-components'
import {
  DARK_BLUE,
  LOGO_FONT,
  PINK
} from './variables'

export const Scrollable = styled.div`
  flex:1;
  width: 100%;
  overflow-y: scroll;
`

export const BorderContainer = styled.div`
  border: 2px solid ${PINK};
  padding: 1.5rem 1.5rem 2.5rem 1.5rem;
  position: relative;
  margin: 1.5rem 1.5rem 2.5rem 1.5rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.75);
  border-radius: 8px;
`

export const BorderContainerTitel = styled.span`
  font-family: ${LOGO_FONT};
  font-size: 2rem;
  background-color: ${DARK_BLUE};
  position: absolute;
  padding: 0 1rem;
  left: 50%;
  top: 0;
  transform: translateX(-50%) translateY(-50%);
  white-space:nowrap; //prevent line break
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
  box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.75);
  
  > * + * {
    border-left: solid 1px ${PINK};
  }
  
  > * {
    cursor: pointer;
  }
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`

export const Action = styled.button`
  color: ${PINK};
  background-color: ${DARK_BLUE};
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  text-shadow: 2px 2px #000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  &:active, &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.5);
  }
`
