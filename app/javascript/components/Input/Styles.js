import styled from 'styled-components'
import {
  PINK,
  WHITE
} from 'styles/variables'

const animationTime = '0.5s'

export const Label = styled.label`
  font-size: 1rem;
  position: absolute;
  top: 0.7rem;
  transform: none;
  transition: transform ${animationTime} ease-in-out;
  opacity: 0.5;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const Input = styled.input`
    border: none;
    width: 100%;
    font-size: 1rem;
    font-family: inherit;
    border-bottom: 3px solid rgba(255,255,255,0.5);
    padding: 0.6875rem 0 0.5rem 0;
    background-color: transparent;
    color: rgba(255,255,255,0.5);
    
    &::placeholder {
      opacity: 0;
    }
    
    &:invalid {
      box-shadow: none;
    }
    
    &:focus, &:valid {
      outline: none;
      
      &::placeholder {
        opacity: 0.5;
        color: ${WHITE};
        transition: opacity ${animationTime} ease-in;
      }
      & + ${Label} {
        transform-origin: top left;
        transform: scale(0.8) translateY(-1.8rem); 
        color: ${PINK};
        opacity: 1;
      }
    }
`
