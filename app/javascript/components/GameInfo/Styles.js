import styled from 'styled-components'
import Button from 'components/Button'
import {
  WHITE,
  BLACK
} from 'styles/variables'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const DayButtonWrapper = styled(Button)`
  background-color: ${(props) => props.active && WHITE};
  color: ${(props) => props.active && BLACK};
`

export const DayButtonContainer = styled.div`
  display: flex;
  flex: 0 0 70;
  overflow-x: scroll;
`

