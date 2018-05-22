import styled from 'styled-components'
import {PINK} from 'styles/variables'

const beamHeight = '0.4em'
const beamWidth = '0.1em'
const beamRadius = '0.7em'
const sunColor = 'yellow'
const sunBodySize = '0.7em'
const removeStyle = `
  transition: opacity ${(props) => props.transitionLength};
  opacity: 0;
`

export const SunBeam = styled.div `
  position: absolute;
  opacity: 1;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 ${beamWidth} ${beamHeight} ${beamWidth};
  border-radius: 20px;
  border-color: transparent transparent ${sunColor} transparent;
  transform: rotate(${(props) => props.rotate}deg) translateY(${beamRadius}) rotate(180deg);
  ${(props) => props.remove && removeStyle}
`

export const SunBody = styled.div`
  position: relative;
  background-color: ${sunColor};
  border-radius: 100%;
  width: ${sunBodySize};
  height: ${sunBodySize};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -0.3em;
  margin-right: -0.1em;
`
