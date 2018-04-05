import styled from 'styled-components'
import { BorderContainer } from 'styles/components'
import LogoImage from 'assets/images/logo_frame.png'

export const Container = styled(BorderContainer)`
  background: url(${LogoImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-origin: content-box;
`
