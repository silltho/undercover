import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: solid black 1px;
  padding: 0.5rem;
  max-width: 10rem;
  
  & > * + * {
    margin-top: 0.2rem;
  }
`

export const GameItem = styled.div`
  background-color: lightgrey;
  padding: 0.2rem;
`
