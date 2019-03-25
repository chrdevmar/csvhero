import React, { Component } from 'react'
import { 
  Menu, 
  Segment
} from 'semantic-ui-react'

import '../styles/TopBar.css';

import ImportCSV from './ImportCSV';
class TopBar extends Component {

  render() {
    const { dataImported } = this.props;
    return (
      <Segment>
        <Menu secondary>
          <Menu.Item header>
            Filename goes here
          </Menu.Item>
          <Menu.Item position="right">
            <ImportCSV
              dataImported={dataImported}
            />
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}

export default TopBar;