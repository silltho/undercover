import styled from 'styled-components'
import {PINK} from 'styles/variables'

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  
  > * {
    margin: 1rem 0 0 0;
    flex: initial;
  }
  
  > *:first-child {
    margin: 0rem;
  }
`

export const Title = styled.div`
  display: flex;
`

export const Logo = styled.img`
  margin: 0rem 1rem;
  max-height: 3rem;
`

export const HomeWrapper = styled.div`
  color: ${PINK};
  font-size: 1rem;
  left: 1rem;
  bottom: 1rem;
  position: absolute;  
  display: flex;
  justify-content: left;
  align-items: baseline;
  justify-content: center;
  border-bottom: 2px solid ${PINK};
`

export const HomeIcon = styled.div`
  font-size: 2.5rem;
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`

export const HomeIconText = styled.div`
  color: rgba(255,255,255,0.5);
  margin-left: 0.3rem;
  padding-right: 2rem;
`
