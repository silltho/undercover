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

export const DayButtonWrapper = styled(Button)`
  background-color: ${(props) => props.active && WHITE};
  color: ${(props) => props.active && BLACK};
`

export const DayButtonContainer = styled.div`
  display: flex;
  flex: 0 0 70;
  overflow-x: scroll;
  margin: 1rem 0;
`

