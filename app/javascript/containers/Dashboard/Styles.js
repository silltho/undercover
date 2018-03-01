import styled from 'styled-components'
import {
	BLACK,
	PINK,
	WHITE
} from 'styles/variables'

export const Wrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

export const ButtonContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-self: center;
	
	> * {
		margin: 1rem 0 0 0;
		flex: initial;
	}
	
	> *:first-child {
		margin: 0rem;
	}
`

export const RoomCodeInput = styled.input`
  background-color: ${BLACK};
  color: ${WHITE};
  border: 2px solid ${PINK};
  line-height: 2rem;
  padding: 0.2rem 0.5rem;
  max-width: 8rem;
  
  &:focus {
    outline: none;
  }
`

export const JoinGameForm = styled.div`
	display: flex;
	flex-direction: row;
`
