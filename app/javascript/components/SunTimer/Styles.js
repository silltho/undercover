import styled, { keyframes } from 'styled-components'
import { YELLOW } from 'styles/variables'

const beamHeight = '0.4em'
const beamWidth = '0.1em'
const beamRadius = '0.7em'
const sunColor = `${YELLOW}`
const sunBodySize = '0.7em'

const removeStyle = `
  opacity: 0;
`

const blink = keyframes`
  from {
    background-color: red;
    border-color: transparent transparent red transparent;
  }

  to {
    background-color: ${YELLOW};
    border-color: transparent transparent ${YELLOW} transparent;
  }
`

export const SunBeam = styled.div `
  position: absolute;
  opacity: 1;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 ${beamWidth} ${beamHeight} ${beamWidth};
  border-radius: 20px;
  border-color: inherit;
  transform: rotate(${(props) => props.rotate}deg) translateY(-${beamRadius});
  transition: opacity ${(props) => props.transitionLength}ms;
  ${(props) => props.remove && removeStyle}
`

export const SunBody = styled.div`
  position: relative;
  background-color: ${sunColor};
  border-color: transparent transparent ${sunColor} transparent;
  border-radius: 100%;
  width: ${sunBodySize};
  height: ${sunBodySize};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -0.3em;
  margin-right: -0.1em;
  
  ${(props) => props.blink && `animation: ${blink} ${props.blinkDuration}ms infinite;`}
`
