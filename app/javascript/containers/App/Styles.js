import styled from 'styled-components'
import {
	DARK_BLUE,
	WHITE,
	MAIN_FONT
} from 'styles/variables'

export const AppContainer = styled.div`
  background-color: ${DARK_BLUE};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0 2rem;
  color: ${WHITE};
  font-family: ${MAIN_FONT};
  display: flex;
  flex-direction: column;
`
