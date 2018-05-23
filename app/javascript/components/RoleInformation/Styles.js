import styled from 'styled-components'
import {
  PINK,
  DARK_BLUE,
  GREEN
} from 'styles/variables'
import IconFont from 'components/IconFont'
import { Section } from 'styles/components'

const drawUsedStyle = `
  background-color: ${PINK};
  color: ${DARK_BLUE};
`

export const SectionText = styled.div`
  text-align: center;
  padding: 1rem 0.5rem;
`

export const ActiveIcon = styled(IconFont)`
  font-size: 3rem;
  width: 100%;
  text-align: center;
  margin: 1rem 0;
`

export const StyledSection = styled(Section)`
  ${ActiveIcon} + ${SectionText} {
    padding-top: 0;
  }
`

export const DrawButton = styled.button`
  border: solid 1px ${PINK};
  color: ${PINK};
  background-color: ${DARK_BLUE};
  border-radius: 3px;
  padding: 0.2rem 0;
  
  ${(props) => props.clicked && drawUsedStyle}
  
  &:focus {
    outline: 0;
  }
`
