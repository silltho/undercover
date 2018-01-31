import styled from 'styled-components'
import {
  LOGO_FONT,
  BLACK,
  PINK,
  WHITE
} from 'styles/variables'

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const TitleLine = styled.div`
  border: 1.5px solid ${PINK};
  height: 0;
  width: 3.5rem;
  position: relative;
  flex: 1;
  
  &:after {
    content: ' ';
    border-radius: 50%;
    border: 0.3rem solid ${PINK};
    position: absolute;
    top: -0.3rem;
    ${(props) => props.right ? { right: '-0.3rem' } : { left: '-0.3rem' }}
  }
`

export const TitleText = styled.div`
  line-height: 1.5rem;
  text-align: center;
  font-family: ${LOGO_FONT};
  font-size: 2rem;
  margin: 0 1rem;
`

export const NewGameForm = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  * + * {
    margin-top: 1rem;
  }
`

export const GameTitleInput = styled.input`
  background-color: ${BLACK};
  color: ${WHITE};
  border: 2px solid ${PINK};
  line-height: 2rem;
  padding: 0.2rem 0.5rem;
  
  &:focus {
    outline: none;
  }
`
