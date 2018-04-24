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
`

export const RoleImage = styled.div`
  flex: 1;
  background: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  border: 1px solid ${PINK};
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
  padding: 0.5rem 1rem;
  text-shadow: 2px 2px #000;
  
  &:active{
    text-shadow: none;
  }
`

export const FlipIcon = styled(IconFont)`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%) translateY(-50%);
  padding: 0.5rem;
  border-radius: 100%;
  border: 1px solid;
  font-size: 1.5rem;
  background-color: ${DARK_BLUE};
`

export const InformationIcon = styled(IconFont)`
  position: absolute;
  transform: translateY(-50%);
  right: 0.3rem;
  top: 50%;
`

export const CardBottom = styled.div`
  position:relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 1rem;
  border-left: 1px solid ${PINK};
  border-right: 1px solid ${PINK};
  border-bottom: 1px solid ${PINK};
`
