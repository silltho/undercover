import styled from 'styled-components'
import { PINK, WHITE, YELLOW } from 'styles/variables'
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 1rem;
  border-radius: 2px;
  color: ${(props) => props.isCurrentPlayer ? PINK : WHITE};
  font-weight: ${(props) => props.isCurrentPlayer ? 800 : 500};
  
  ${IconFont} {
    color: ${YELLOW};
    width: 2rem;
    margin-left: -2rem;
  }
`
