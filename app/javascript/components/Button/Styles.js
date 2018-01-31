import styled from 'styled-components'
import {
  BLACK,
  PINK,
  WHITE
} from 'styles/variables'

export const ButtonWrapper = styled.button`
  background-color: ${BLACK};
  color: ${WHITE};
  border: 3px solid ${PINK};
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  flex: 1;
  margin-left: 1rem;
  
  &:first-child {
   margin: 0;
  }
`

