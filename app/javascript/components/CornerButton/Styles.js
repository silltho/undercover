import styled from 'styled-components'
import {
  PINK,
  DARK_BLUE
} from 'styles/variables'

const borderStyle = `1px solid ${PINK}`

const right = `
  right: 0;
  border-left: ${borderStyle};
`

const left = `
  left: 0;
  border-right: ${borderStyle};
`

const top = `
  top: 0;
  border-bottom: ${borderStyle};
`

const bottom = `
  bottom: 0;
  border-top: ${borderStyle};
`

export const Wrapper = styled.div`
  position: absolute;
  border-top-left-radius: 90%;
  background-color: ${DARK_BLUE};
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;
  ${(props) => props.right && right}
  ${(props) => props.left && left}
  ${(props) => props.top && top}
  ${(props) => props.bottom && bottom}
  opacity: ${(props) => props.clicked ? '0' : '1'};
  
  > * {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }
  
  &:active {
    opacity: 0;
  }
`

