import styled from 'styled-components'
import {
  BLACK,
  PINK
} from 'styles/variables'

export const ButtonWrapper = styled.button`
  background-color: transparent;
  color: ${(props) => props.primary ? PINK : 'rgba(255, 255, 255, 0.5)'};
  border: 3px solid ${(props) => props.primary ? PINK : 'rgba(255, 255, 255, 0.5)'};
  box-shadow: 3px 3px 0 0 ${BLACK};
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  flex: 1;
  margin-left: 1rem;
  
  &:first-child {
   margin: 0;
  }
  
  &:focus, &:active {
    outline: none;
  }
  
  &:active {
    border: 3px solid ${PINK};
    color: ${PINK};
    box-shadow: none;
  }
`

