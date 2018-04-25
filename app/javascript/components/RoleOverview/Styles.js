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
  justify-content: space-between;
  align-items: center;
`

export const FractionImage = styled.img`
  height: 2.5rem;
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

export const PassiveIcon = styled(IconFont)`
  font-size: 2.1rem;
  padding: 0.2rem;
`

export const ActionIcon = styled(IconFont)`
  font-size: 2rem;
  padding: 0.5rem 1rem;
  text-shadow: 2px 2px #000;
  
  &:active{
    text-shadow: none;
  }
`

export const InformationIcon = styled(IconFont)`
    top: 0;
    right: 0;
    background-color: #06242d;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    position: absolute;
    align-items: center;
    border-bottom-left-radius: 0.7rem;
    font-size: 1.4rem;
`

export const CardBottom = styled.div`
  position:relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-left: 1px solid ${PINK};
  border-right: 1px solid ${PINK};
  border-bottom: 1px solid ${PINK};
`
