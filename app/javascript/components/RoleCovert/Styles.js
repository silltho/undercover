import styled from 'styled-components'
import { PINK } from 'styles/variables'
import LogoImage from 'assets/images/logo_frame.png'

export const Container = styled.div`
  border: 1px solid ${PINK};
  padding: 1.5rem;
  position: relative;
  margin: 2rem 0;
  display: flex;
  flex: 1;
  background: url(${LogoImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-origin: content-box;
`
