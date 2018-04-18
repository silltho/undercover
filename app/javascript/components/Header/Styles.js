import styled from 'styled-components'
import {
	LOGO_FONT,
	PINK
} from 'styles/variables'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 3rem;
  font-family: ${LOGO_FONT};
  font-size: 2rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid ${PINK};
`

export const Title = styled.div`
  display: flex;
`

export const Logo = styled.img`
  margin: 0rem 1rem;
  max-height: 3rem;
`
