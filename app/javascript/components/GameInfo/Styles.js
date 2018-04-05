import styled from 'styled-components'
import {
  PINK,
  DARK_BLUE
} from 'styles/variables'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const InfoList = styled.ul`
  flex: 1;
  list-style-type: none;
  text-align: center;
  
  > li {
    margin-top: 1rem;
  }
`

export const NoInfosMessage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DayButtonWrapper = styled.div`
  text-align: center;
  padding: 0.5rem;
  flex: 1;
  background-color: ${(props) => props.active ? PINK : DARK_BLUE};
  color: ${(props) => props.active ? DARK_BLUE : PINK};
  
  & + & {
    border-left: 1px solid ${PINK};
  }
`

export const DayButtonContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin: 1rem 0;
  border: 1px solid ${PINK};
  border-radius: 3px;
`

