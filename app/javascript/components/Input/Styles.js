import styled from 'styled-components'
import {
  PINK,
  WHITE,
  RED,
  BLACK
} from 'styles/variables'

const animationTime = '0.5s'

export const Label = styled.label`
  font-size: 1rem;
  position: absolute;
  top: 0.7rem;
  transform: none;
  transform-origin: top left;
  transition: all ${animationTime} ease-in-out;
  opacity: ${(props) => props.error ? '1' : '0.5'};
  ${(props) => props.error && `color: ${RED} !important;`}
`

export const Line = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3px;
  box-shadow: 3px 3px 0 0 ${BLACK};
  background-color: ${(props) => props.error ? RED : 'rgba(255, 255, 255 ,0.5)'};
`

export const Input = styled.input`
    border: none;
    width: 100%;
    font-size: 1rem;
    font-family: inherit;
    padding: 0.6875rem 0 0.5rem 0;
    background-color: transparent;
    color: rgba(255,255,255,0.5);
    
    &:invalid {
      box-shadow: none;
    }
    
    &:focus, &:valid {
      outline: none;
      
      & + ${Label} {
        opacity: 1;
        transform-origin: top left;
        transform: scale(0.8) translateY(-100%) translateY(-0.5rem); 
        color: ${PINK};
      }
    }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  
  ${Input} {
    opacity: 0;
  }
  
  ${Input}:focus, ${Input}:valid {
    opacity: 1;
    color: ${WHITE};
    transition: opacity ${animationTime} ease-in;
  }
`
