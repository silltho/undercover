import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import styled, { injectGlobal } from 'styled-components'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .slideInOut-enter {
    transform: translateX(100%);
  }
  
  .slideInOut-enter.slideInOut-enter-active {
    transform: translateX(0%);
    transition: all .5s ease-in;
  }
  
  .slideInOut-leave {
    transform: translateX(0%);
  }
  
  .slideInOut-leave.slideInOut-leave-active {
    transform: translateX(-100%);
    transition: all .5s ease-in;
  }
`

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

class SlideInOut extends React.PureComponent {
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
        transitionName="slideInOut"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        component={Wrapper}
      />
    )
  }
}

export default SlideInOut
