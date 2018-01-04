import React from 'react'
import {
  AppBar
} from 'material-ui'
import Menu from './Menu'

class Nav extends React.PureComponent {
  render() {
    return (
      <AppBar
        title="Undercover"
        iconElementRight={<Menu />}
      />
    )
  }
}

export default Nav
