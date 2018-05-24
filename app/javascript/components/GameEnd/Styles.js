import styled from 'styled-components'
import IconFont from 'components/IconFont'

export const Player = styled.div`
  display: flex;
  padding: 0.5rem 1rem; 
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
