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
        <Link to="/filter">
          <Menu.Item
            color="teal"
            active={location.pathname === '/filter'}
            name='Filter'
          />
        </Link>
        <Link to="/edit">
          <Menu.Item
            color="teal"
            active={location.pathname === '/edit'}
            name='Bulk Edit'
          />
        </Link>
        <Link to="/visualise">
          <Menu.Item 
            color="teal"
            active={location.pathname === '/visualise'}
            name='Visualise'
          />
        </Link>
        <Link to="/export">
          <Menu.Item
            color="teal"
            active={location.pathname === '/export'}
            name='Export'
          />
        </Link>
      </Menu>
    )
  }
}

export default withRouter(NavItems);