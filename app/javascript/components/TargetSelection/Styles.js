import styled from 'styled-components'
import {
  WHITE,
  BLACK
} from 'styles/variables'

const targetStyle = {
  backgroundColor: WHITE,
  color: BLACK
}

export const VictimItemWrapper = styled.div`
  ${(props) => props.isTarget && targetStyle}
`
