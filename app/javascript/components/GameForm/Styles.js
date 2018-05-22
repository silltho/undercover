import styled from 'styled-components'
import Button from 'components/Button'

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
  ${(props) => props.deactivated && `
    opacity: 0.5;
    pointer-events: none;
  `}
  
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

export const SeperatorRow = styled(Row)`
  flex-direction: column;
  margin: 1rem 0;
`

