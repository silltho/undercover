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
  text-align: left;
  
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
  padding: 0.5rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.active ? PINK : DARK_BLUE};
  color: ${(props) => props.active ? DARK_BLUE : PINK};
  
  & + & {
    border-left: 1px solid ${PINK};
  }
`

export const DayButtonContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  border-bottom-left-radius: 4px;
  height: 3rem;
  
  > :last-child {
   border-right: 1px solid ${PINK};
  }
`

export const BottomDawnContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  border-top: 1px solid ${PINK}; 
`

export const Distribution = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -1.5rem;
  padding: 0.25rem 1.5rem;
  border-top: solid 1px ${PINK};
  border-bottom: solid 1px ${PINK};
`

export const DistributionSection = styled.div`
  display: flex;
`

export const Fraction = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  
  &:first-child {
    margin-left: 0;
  }
  
  > *:first-child {
    margin-right: 0.25rem;
  }
`

export const FractionImg = styled.img`
  height: 1rem;
`
