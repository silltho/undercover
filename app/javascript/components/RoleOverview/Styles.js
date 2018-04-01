import styled from 'styled-components'
import IconFont from 'components/IconFont'

export const RoleImage = styled.div`
  flex: 1;
  background: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
`

export const Action = styled(IconFont)`
  font-size: 3rem;
  padding: 0.5rem;
  margin-left: 1rem;
  
  &:first-child {
    margin: 0;
  }
`
