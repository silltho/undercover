import React from 'react'
import {
  IconMenu,
  IconButton,
  MenuItem
} from 'material-ui'
import { WHITE } from 'styles/variables'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

class Nav extends React.PureComponent {
  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon color={WHITE} /></IconButton>}
      >
        <MenuItem primaryText="Join Game" />
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    )
  }
}

export default Nav
