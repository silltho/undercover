import styled from 'styled-components'
import IconFont from 'components/IconFont'
import Button from 'components/Button'
import { PINK } from 'styles/variables'

export const RoleImage = styled.div`
  flex: 1;
  background: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  border: 1px solid ${PINK};
`

export const RoleVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  border: 1px solid ${PINK};
`

export const ActionIcon = styled(IconFont)`
  font-size: 2.5rem;
  padding: 0.5rem 1rem;
  text-shadow: 2px 2px #000;
  
  &:active{
    text-shadow: none;
  }
`
export const ActionButton = styled(Button)`
  margin: 0.5rem 1rem;
`
