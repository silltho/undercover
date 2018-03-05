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
