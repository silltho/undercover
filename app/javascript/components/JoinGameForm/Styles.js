import styled from 'styled-components'
import {
  BLACK,
  PINK,
  WHITE
} from 'styles/variables'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const RoomCodeInput = styled.input`
  background-color: ${BLACK};
  color: ${WHITE};
  border: 3px solid ${PINK};
  line-height: 2rem;
  padding: 0.2rem 0.5rem;
  max-width: 8rem;
  
  &:focus {
    outline: none;
  }
`
