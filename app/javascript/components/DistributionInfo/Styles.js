import styled from 'styled-components'
import {
  PINK
} from 'styles/variables'

export const Distribution = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -1.5rem;
  padding: 0.25rem 1.5rem;
  border-top: solid 1px ${PINK};
  border-bottom: solid 1px ${PINK};
`

export const DistributionSection = styled.div`
  display: flex;
`

export const Fraction = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  
  &:first-child {
    margin-left: 0;
  }
  
  > *:first-child {
    margin-right: 0.25rem;
  }
`

export const FractionImg = styled.img`
  height: 1rem;
`
