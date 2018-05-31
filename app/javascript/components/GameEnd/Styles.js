import styled from 'styled-components'
import IconFont from 'components/IconFont'
import {
  WHITE,
  DARK_BLUE
} from 'styles/variables'

export const Player = styled.div`
  display: flex;
  margin: 0.5rem;
  padding: 0 0.5rem;
  border-radius: 2px;
  ${(props) => props.isCurrentPlayer && (`
    background-color: ${WHITE};
    color: ${DARK_BLUE};
  `)}
`

export const ResultText = styled.div`
  font-size: 2rem;
  marign: 1rem 0;
`

export const Role = styled.div`
  flex: 1;
  text-align: right;
`

export const CodeName = styled.div`
  flex:1;
`

export const FractionLogo = styled.div`
  > img {
    width: 5rem;
  }
`

export const ImageWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`

export const StateIcon = styled(IconFont)`
  display: flex;
  align-items: center;
`
