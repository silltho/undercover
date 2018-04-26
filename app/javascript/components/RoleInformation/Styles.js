import styled from 'styled-components'
import IconFont from 'components/IconFont'

export const ActiveIcon = styled(IconFont)`
  font-size: 3rem;
  width: 100%;
  text-align: center;
  margin: 1rem 0;
`

export const Section = styled.div`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const SectionText = styled.div`
  text-align: center;
  padding: 1rem 0.5rem;
`
