import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import styled, { injectGlobal } from 'styled-components'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .flip-enter {
    opacity: 0;
    transform: rotateY(180deg);
  }
  
  .flip-enter.flip-enter-active {
    opacity: 1;
    transform: rotateY(0deg);
  }
  
  .flip-leave {
    opacity: 1;
    transform: rotateY(0deg);
  }
  
  .flip-leave.flip-leave-active {
    opacity: 0;
    transform: rotateY(180deg);
  }
`

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  > * {
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: all .5s ease-in-out;
  }
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
