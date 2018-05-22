import styled from 'styled-components'
import {
  DARK_BLUE,
  LOGO_FONT,
  PINK
} from './variables'

const cardBorderRadius = '8px'

export const Scrollable = styled.div`
  flex:1;
  width: 100%;
  overflow-y: scroll;
`

export const BorderContainer = styled.div`
  border: 2px solid ${PINK};
  padding: 1.5rem;
  position: relative;
  margin: 1.5rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.75);
  border-radius: ${cardBorderRadius};
  min-height: 0;
  height: 100%;
`

export const BorderContainerTitel = styled.span`
  font-family: ${LOGO_FONT};
  font-size: 2rem;
  background-color: ${DARK_BLUE};
  position: absolute;
  padding: 0 1rem;
  left: 50%;
  top: 0;
  transform: translateX(-50%) translateY(-50%);
  white-space:nowrap; //prevent line break
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`

export const Section = styled.div`
  display:flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const Header = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 3rem;
  font-family: ${LOGO_FONT};
  font-size: 2rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid ${PINK};
`

export const Footer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`

export const RoomCode = styled.div `
  position: absolute;
  bottom: 0.3rem;
  left: 1.7rem;
  font-style: italic;
  font-size: 0.65rem;
`

export const SunBeam = styled.div `
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 25px 10px;
  border-radius: 20px;
  border-color: transparent transparent ${PINK} transparent;
`
