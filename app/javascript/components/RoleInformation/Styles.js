import styled from 'styled-components'
import {
  PINK,
  DARK_BLUE,
  LOGO_FONT
} from 'styles/variables'
import IconFont from 'components/IconFont'

export const ActiveIcon = styled(IconFont)`
  font-size: 3rem;
  width: 100%;
  text-align: center;
  margin: 1rem 0;
`

export const Container = styled.div`
  border: 1px solid ${PINK};
  padding: 1.5rem;
  position: relative;
  margin: 2rem 0;
  display: flex;
  flex: 1;
`

export const RoleName = styled.span`
  font-family: ${LOGO_FONT};
  font-size: 2rem;
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
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const SectionText = styled.div`
  text-align: center;
  padding: 1rem 0.5rem;
`

export const SectionWrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
`
