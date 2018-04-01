import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import styled, { injectGlobal } from 'styled-components'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .flip-enter {
    backface-visibility: hidden;
    transform: rotateY(180deg);
    transform-style: preserve-3d;
  }
  
  .flip-enter.flip-enter-active {
    transform: rotateY(0deg);
    transition: transform .5s ease-in;
  }
  
  .flip-leave {
    backface-visibility: hidden;
    transform: rotateY(0deg);
    transform-style: preserve-3d;
  }
  
  .flip-leave.flip-leave-active {
    transform: rotateY(180deg);
    transition: transform .5s ease-in;
  }
`

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

class Flip extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      animationEnter: false,
      animationEnd: false,
      shouldRender: true
    }
  }


  render() {
    return (
      <CSSTransitionGroup
        {...this.props}
        transitionName="flip"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        component={Wrapper}
      />
    )
  }
}

export default Flip
