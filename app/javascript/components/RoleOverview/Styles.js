import styled from 'styled-components'

export const RoleImage = styled.div`
  flex: 1;
  background: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
`
