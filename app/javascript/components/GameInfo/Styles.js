import styled from 'styled-components'
import Button from 'components/Button'
import {
  WHITE,
  BLACK
} from 'styles/variables'

export const DayButtonWrapper = styled(Button)`
  background-color: ${(props) => props.active && WHITE};
  color: ${(props) => props.active && BLACK};
`

