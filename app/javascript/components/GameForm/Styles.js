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

export const SeperatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 1rem 0rem;
`

export const Seperator = styled.div`
  border: 1px solid ${PINK};
  height: 0;
  position: relative;
  flex: 1;
  
  &:after {
    content: ' ';
    border-radius: 50%;
    border: 0.3rem solid ${PINK};
    position: absolute;
    top: -0.25rem;
    ${(props) => props.right ? { right: '-0.3rem' } : { left: '-0.3rem' }}
  }
`

export const SeperatorText = styled.div`
  color: ${PINK};
  line-height: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.5rem;
  margin: 0 1rem;
`
