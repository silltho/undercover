import styled from 'styled-components'
import {
  WHITE,
  BLACK,
  PINK
} from 'styles/variables'

const targetStyle = {
  backgroundColor: WHITE,
  color: BLACK
}

export const VictimItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${PINK};
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  ${(props) => props.isTarget && targetStyle}
  ${(props) => props.isDead && 'opacity: 0.5;'}
  
  &:active {
    ${targetStyle};
  }
  
  & + & {
    margin-top: 0.5rem;
  }
`
