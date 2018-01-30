import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { darken } from 'polished'

const secondaryButton = {
	backgroundColor: 'gray',
	color: 'white'
}

const secondaryButtonHover = {
	backgroundColor: darken(0.1, 'gray'),
	color: darken(0.1, 'white')
}

const disabledButton = {
	backgroundColor: 'gray',
	borderColor: 'pink',
	cursor: 'not-allowed'
}

export const ModalWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const Header = styled.div`
  color: white;
  display: flex;
  flex: 1;
  background-color: grey;
  padding: 0.7rem 1rem;
  font-weight: normal;
  align-items: center;
`

export const CloseIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
`

export const CloseIcon = styled(FontAwesome)`
	color: white;
  cursor: pointer;
  opacity: 0.75;
  
  &:hover {
    opacity: 1;
  }
`

export const Content = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.5rem;
`

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
`

export const SubTitle = styled.div`
  opacity: 0.5;
  text-align: center;
  margin-bottom: 2rem;
`

export const Button = styled.button`
  padding: 0.6rem 1.5rem;
  background-color: black;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  border: 1px solid pink;
  margin-right: 1rem;
  text-align: center;
  ${(props) => props.secondary && secondaryButton}
  ${(props) => props.disabled && disabledButton}
  
  ${FontAwesome}:first-child {
    margin-right: 0.8rem;
  }
  
  ${FontAwesome}:last-child {
    margin-left: 0.8rem;
  }
  
  &:focus {
   outline: none;
  }
  
  &:hover {
    background-color: ${darken(0.1, 'black')};
    border-color: ${darken(0.1, 'pink')};
    color: white;
    ${(props) => props.secondary && secondaryButtonHover}
    ${(props) => props.disabled && disabledButton}
  }
  
  &:last-child {
    margin-right: 0;
  }
`
