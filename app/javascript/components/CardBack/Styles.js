import styled from 'styled-components'
import { PINK } from 'styles/variables'
import CardBack from 'assets/images/cardback.svg'

export const ImageWrapper = styled.div`
    display: flex;
    flex: 1;
    border-radius: 8px;
    border: solid 1px ${PINK};
    justify-content: center;
    position: relative;
    
    &:after {
      z-index: -1;
      position: absolute;
      border-radius: 8px;
      width: 100%;
      height: 100%;
      content: '';
      opacity: 0.5;
      background-image: url(${CardBack});
      background-color: #1B4C5B;
      left: 50%;
      background-repeat: repeat;
      left: 50%;
      transform: translateX(-50%);
    }
    
    > img {
      max-width: 70%;
      object-fit: contain;
    }
`

export const CardBackText = styled.div`
  position: absolute;
  bottom: 2.5rem;
  font-size: 2.5rem;
  text-decoration: overline;
  color: ${PINK};
  left: 50%;
  transform: translateX(-50%);
`

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`
