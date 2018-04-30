import styled from 'styled-components'
import { PINK } from 'styles/variables'
import Button from 'components/Button'

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const JoinButton = styled(Button)`
  flex: 0;
`

export const CenteredText = styled.span`
  flex: 1;
  text-align: center;
  opacity: 0.5;
`

export const Seperator = styled.hr`
  margin: 1.5rem -2rem;
  left: 0;
  right: 0;
  opacity: 0.5;
`
