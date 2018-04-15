import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import styled, { injectGlobal } from 'styled-components'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .fadeIn-appear {
    opacity: 0;
    transform: translateY(20%);
  }
  
  .fadeIn-appear.fadeIn-appear-active {
    opacity: 1;
    transform: translateY(0%);
    transition: all .5s ease-in;
  }
  .fadeIn-leave {
    opacity: 1;
    transform: translateY(0%);
  }
  
  .fadeIn-leave.fadeIn-leave-active {
    opacity: 0;
    transform: translateY(20%);
    transition: all .5s ease-in;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`


class FadeIn extends React.PureComponent {
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
        transitionName="fadeIn"
        transitionEnter={false} // doesnt work on mounting
        transitionAppear
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}
        component={Wrapper}
      />
    )
  }
}

export default FadeIn
