import styled from 'styled-components'
import {
  DARK_BLUE,
  WHITE,
  MAIN_FONT
} from 'styles/variables'

export const AppContainer = styled.div`
  background-color: ${DARK_BLUE};
  color: ${WHITE};
  font-family: ${MAIN_FONT};
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100%;
  min-height: 30rem;
`
