import styled from 'styled-components'
import {
  PINK,
  DARK_BLUE
} from 'styles/variables'

const borderStyle = `1px solid ${PINK}`

const topRight = `
  top: 0;
  right: 0;
  border-bottom: ${borderStyle};
  border-left: ${borderStyle};
  border-radius: 0 0 0 90%;
`

const topLeft = `
  top: 0;
  left: 0;
  border-right: ${borderStyle};
  border-bottom: ${borderStyle};
  border-radius: 0 0 90% 0;
`

const bottomRight = `
  bottom: 0;
  right: 0;
  border-top: ${borderStyle};
  border-left: ${borderStyle};
  border-radius: 90% 0 0 0;
`

const bottomLeft = `
  bottom: 0;
  left: 0;
  border-top: ${borderStyle};
  border-right: ${borderStyle};
  border-radius: 0 90% 0 0;
`

export const Wrapper = styled.div`
  position: absolute;
  background-color: ${DARK_BLUE};
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;
  font-size: 1.5rem;
  ${(props) => props.topRight && topRight}
  ${(props) => props.topLeft && topLeft}
  ${(props) => props.bottomRight && bottomRight}
  ${(props) => props.bottomLeft && bottomLeft}
  opacity: ${(props) => props.clicked ? '0' : '1'};
  
  > * {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }
  
  &:active {
    opacity: 0;
  }
`

