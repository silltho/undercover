import styled from 'styled-components'
import { PINK, YELLOW } from 'styles/variables'
import IconFont from 'components/IconFont'

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 0.5rem;
`

export const PlayerItem = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.isCurrentPlayer ? PINK : 'transparent'};
  margin: 0 1rem;
  border-radius: 2px;
  
  ${IconFont} {
    color: YELLOW;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`
