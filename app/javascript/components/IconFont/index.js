import styled, {injectGlobal} from 'styled-components'
import FontEOT from './fonts/icomoon.eot'
import FontSVG from './fonts/icomoon.svg'
import FontTTF from './fonts/icomoon.ttf'
import FontWOFF from './fonts/icomoon.woff'
import ICONS from './icons'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @font-face {
    font-family: 'UndercoverIconFont';
    src:  url('${FontEOT}');
    src:  url('${FontEOT}#iefix') format('embedded-opentype'),
      url('${FontTTF}') format('truetype'),
      url('${FontWOFF}') format('woff'),
      url('${FontSVG}#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }
`

const fixedWith = `
  width: 1.65em;
  text-align: center;
`

const IconFontWrapper = styled.span`
  font-family: 'UndercoverIconFont' !important;
  display: inline-block;
  speak: none;
  font-size: inherit;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  &:before {
    content: ${(props) => `"\\${props.icon}"`};
  }

  ${(props) => props.fixedWidth && fixedWith}
`

export const ACTIVE_ICONS = {
  corrupt: ICONS.corrupt,
  blackmail: ICONS.beat,
  shoot: ICONS.kill,
  free: ICONS.keys,
  convert: ICONS.convert,
  imprison: ICONS.handcuffs,
  spy: ICONS.goggles,
  poison: ICONS.poison
}

export const PASSIVE_ICONS = {
  immunity: ICONS.immunity
}

export { ICONS }

export default IconFontWrapper
