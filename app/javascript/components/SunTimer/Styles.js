import styled from 'styled-components'
import { PINK } from 'styles/variables'

const beamHeight = '0.7em'
const beamWidth = '0.3em'

export const SunBeam = styled.div `
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 ${beamWidth} ${beamHeight} ${beamWidth};
  border-radius: 20px;
  border-color: transparent transparent ${PINK} transparent;
  transform: rotate(${(props) => props.rotate}deg) translateY(0.9em) rotate(180deg);
`

export const SunBody = styled.div`
  position: relative;
`
