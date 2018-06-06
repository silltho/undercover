import styled from 'styled-components'
import {
  DARK_BLUE,
  WHITE,
  MAIN_FONT,
  PINK
} from 'styles/variables'

export const AppContainer = styled.div`
  user-select:none;
  background-color: ${DARK_BLUE};
  color: ${WHITE};
  font-family: ${MAIN_FONT};
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  transform: translateX(-50%);
  left: 50%;
  max-width: 480px;
  min-height: 480px;
  box-shadow: 0 0 0 1px ${PINK};
`
