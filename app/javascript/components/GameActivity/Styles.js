import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const RoleImage = styled.div`
  flex: 1;
  background: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
`

export const RoleName = styled.div`
  text-align: center;
  font-size: 1.5rem;
`
