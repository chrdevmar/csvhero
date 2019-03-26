import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import '../styles/ActionPanel.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Filter from '../../filter/containers/Filter';
import Edit from '../../edit/containers/Edit';
import Visualise from '../../visualise/containers/Visualise';
import Export from '../../export/containers/Export';

class ActionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'Filter' }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick (e, { name }){ 
    this.setState({ activeItem: name })
  }

  render() {

    return (
      <Router>
        <Menu pointing secondary vertical>
          <Link to="/filter">
            <Menu.Item
              name='Filter'
            />
          </Link>
          <Link to="/edit">
            <Menu.Item 
              name='Edit'
            />
          </Link>
          <Link to="/visualise">
            <Menu.Item 
              name='Visualise'
            />
          </Link>
          <Link to="/export">
            <Menu.Item 
              name='Export'
            />
          </Link>
        </Menu>
        <Route path="/filter" exact component={Filter} />
        <Route path="/edit" exact component={Edit} />
        <Route path="/visualise" exact component={Visualise} />
        <Route path="/export" exact component={Export} />
      </Router>
    )
  }
}

export default ActionPanel; 