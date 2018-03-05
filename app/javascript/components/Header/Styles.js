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
  font-size: 3rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`

export const Title = styled.div`
	display: flex;
`

export const Logo = styled.img`
  margin: 0rem 1rem;
  max-height: 3rem;
`

export const Line = styled.div`
 border: 0; 
 height: 1px; 
 background-color: ${PINK};
 width: 100%;
`

