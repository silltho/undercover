import styled from 'styled-components'
import IconFont from 'components/IconFont'
import {
  PINK,
  DARK_BLUE
} from 'styles/variables'

const ImprisonedStyle = `
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 110%;
    transform: translate(-17px);
    content: '';
    background-image: repeating-linear-gradient(90deg, transparent, transparent 30px, black 3px, #dbdbdb 40px);
  }
`

const DeadStyle = `
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: 'DEAD';
    font-size: 4rem;
    color: red;
  }
  
  > video {
    filter: grayscale(1);
  }
`

export const CardHead = styled.div`
  text-align: center;
  margin-top: -0.45rem;
  margin-bottom: 0.33rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FractionImage = styled.img`
  top: 1rem;
  left: 0.1rem;
  z-index: 1333333;
  position: absolute;
  height: 4rem;
  transform: rotate(-15deg);
`

export const RoleVideoContainer = styled.div`
  flex: 1;
  border: 1px solid ${PINK};
  overflow: hidden;
  position: relative;
  
  > video {
    object-fit: cover;
    min-height: 100%;
    width: 100%;
    
  }
  
  ${(props) => props.dead && DeadStyle}
  ${(props) => props.imprisoned && ImprisonedStyle}
`

export const ActionIcon = styled(IconFont)`
  font-size: 2rem;
  padding: 0.5rem;
  text-shadow: 2px 2px 2px #000;
  box-shadow: 2px 2px 2px #000;
  border: 1px solid white;
  border-radius: 100%;
  
  &:active{
    text-shadow: none;
  }
`

export const InformationIcon = styled(IconFont)`
    bottom: 0;
    right: 0;
    background-color: #06242d;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    position: absolute;
    align-items: center;
    border-top-left-radius: 0.7rem;
    font-size: 1.4rem;
    opacity: 0.8;
`

export const CardBottomWrapper = styled.div`
  position:relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-left: 1px solid ${PINK};
  border-right: 1px solid ${PINK};
  border-bottom: 1px solid ${PINK};
`

export const CardBottomText = styled.span`
  text-align: center;
  flex: 1;
`
