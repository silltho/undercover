import styled from 'styled-components'

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
