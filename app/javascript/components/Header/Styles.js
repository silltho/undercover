import styled from 'styled-components'
import { LOGO_FONT } from 'styles/variables'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 3rem;
  font-family: ${LOGO_FONT};
  font-size: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`

export const Logo = styled.img`
  margin: 0rem 1rem;
  max-height: 3rem;
`

