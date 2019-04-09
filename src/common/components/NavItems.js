import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class NavItems extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'Filter' }
  }

  render() {
    const { location } = this.props;
    return (
      <Menu pointing secondary vertical>
        <Link to="/app/filter">
          <Menu.Item
            color="teal"
            active={location.pathname === '/app/filter'}
            name='Filter'
          />
        </Link>
        <Link to="/app/edit">
          <Menu.Item
            color="teal"
            active={location.pathname === '/app/edit'}
            name='Bulk Update'
          />
        </Link>
        <Link to="/app/export">
          <Menu.Item
            color="teal"
            active={location.pathname === '/app/export'}
            name='Export'
          />
        </Link>
        <Link to="/app/visualise">
          <Menu.Item 
            color="teal"
            active={location.pathname === '/app/visualise'}
            name='Visualise'
          />
        </Link>
      </Menu>
    )
  }
}

export default withRouter(NavItems);