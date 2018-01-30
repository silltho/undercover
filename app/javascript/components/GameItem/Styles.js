import styled from 'styled-components'
import {
  WHITE,
  PINK,
  BLACK
} from 'styles/variables'

export const Wrapper = styled.div`
  margin-right: 5px;
  & + & {
    margin-top: 1rem;
  }
`

export const GameTitle = styled.div`
  color: ${(props) => props.full ? PINK : WHITE};
  background-color: ${BLACK};
  border: 3px solid ${PINK};
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  flex: 1;
  text-align: center;
  box-shadow: 5px 5px 0 0 ${PINK};
  position: relative;
  
  &:after,
  &:before {
    content: '';
    background: ${PINK};
    position: absolute;
  }
  &:after {
    width: 100%;
    height: 5px;
    left: 0;
    bottom: -3px;
    transform: translatey(100%) skewx(45deg);
  }
  &:before {
    width: 5px;
    height: 100%;
    transform: translatex(100%) skewy(45deg);
    top: 0;
    right: -3px;
  }
`
