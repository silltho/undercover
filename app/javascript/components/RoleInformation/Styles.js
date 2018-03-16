import styled from 'styled-components'
import {
  PINK,
	DARK_BLUE
} from 'styles/variables'

export const Container = styled.div`
  border: 1px solid ${PINK};
  padding: 1.5rem;
  position: relative;
  margin: 2rem 0;
`

export const RoleName = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background-color: ${DARK_BLUE};
  position: absolute;
  left: 50%;
  top: 0;
  padding: 0 1rem;
  transform: translateX(-50%) translateY(-50%);
`

export const Logo = styled.img`
  height: 2.5rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(56%);
`

export const Section = styled.div`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`

export const SectionText = styled.div`
  text-align: center;
  padding 0.5rem;
`
