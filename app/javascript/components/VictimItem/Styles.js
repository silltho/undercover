import styled from 'styled-components'
import {
  WHITE,
  BLACK,
  PINK
} from 'styles/variables'
import IconFont from 'components/IconFont'

const targetStyle = {
  backgroundColor: WHITE,
  color: BLACK
}

export const VictimItemWrapper = styled.div`
  display: flex;
  border: 2px solid ${PINK};
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  margin-top: 0.5rem;
  height: 3.5rem;
  ${(props) => props.isTarget && targetStyle}
  ${(props) => props.isDead && 'opacity: 0.5;'}
`

export const FractionImage = styled.img`
  height: 2.2rem;
`

export const VictimInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`

export const VictimRole = styled.span`
  font-style: italic;
  opacity: 0.5;
`

export const VictimStateIcon = styled(IconFont)`
  font-size: 2rem;
`

export const VictimIcon = styled.div`
  display: flex;
  align-items: center;
  min-width: 3rem;
  
  &:last-child {
    justify-content: flex-end;
  }
`
