import styled from 'styled-components'
import { PINK } from 'styles/variables'
import Button from 'components/Button'

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const Nickname = styled(Row)`
  margin-bottom: 3rem;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: solid 1px ${PINK};
  position: relative;
`

export const FormTitel = styled.div`
  position: absolute;
  top: 0;
  transform: translateY(-100%) translateY(-0.5rem);
`

export const JoinButton = styled(Button)`
  flex: 0;
`
