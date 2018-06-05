import styled from 'styled-components'
import {
  PINK,
  RED
} from 'styles/variables'

export const PlayerCount = styled.div`
  font-size: 1.5rem;
  text-shadow: 3px 3px #000000;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`

export const PlayerCountInfo = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: ${RED};
`

export const RoomCode = styled.div`
  display: flex;
  justify-content: center;
`

export const ShareButton = styled.div`
  position: absolute;
  right: 1.2rem;
  font-size: 1.6rem;
  color: ${PINK};
`
