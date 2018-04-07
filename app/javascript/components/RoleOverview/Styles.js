import styled from 'styled-components'
import IconFont from 'components/IconFont'
import Button from 'components/Button'
import { PINK } from 'styles/variables'

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
`

export const ActionIcon = styled(IconFont)`
  font-size: 2rem;
  padding: 0.5rem 1rem;
  text-shadow: 2px 2px #000;
  
  &:active{
    text-shadow: none;
  }
`

export const ActionButton = styled(Button)`
  margin: 0.5rem 1rem;
`

export const Informations = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  
  > div > span {
    float: right;
  }
`
