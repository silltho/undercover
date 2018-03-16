import styled from 'styled-components'
import {
  LOGO_FONT,
  PINK
} from 'styles/variables'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const TitleLine = styled.div`
  border: 1.5px solid ${PINK};
  height: 0;
  width: 3.5rem;
  position: relative;
  flex: 1;
  
  &:after {
    content: ' ';
    border-radius: 50%;
    border: 0.3rem solid ${PINK};
    position: absolute;
    top: -0.3rem;
    ${(props) => props.right ? { right: '-0.3rem' } : { left: '-0.3rem' }}
  }
`

export const TitleText = styled.div`
  color: ${PINK};
  line-height: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  font-family: ${LOGO_FONT};
  font-size: 1.5rem;
  margin: 0 1rem;
`
