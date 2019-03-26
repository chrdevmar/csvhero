import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Segment } from 'semantic-ui-react'

import '../styles/TopBar.css';

import ImportCSV from '../containers/ImportCSV';
class TopBar extends Component {

  render() {
    const { file, rows } = this.props;
    return (
      <div id="topBarRoot">
        <Segment>
          <Menu secondary>
            <Menu.Item header>
              { file.name }
              { rows.length ? ` (${rows.length} rows)` : null}
            </Menu.Item>
            <Menu.Item position="right">
              <ImportCSV />
            </Menu.Item>
          </Menu>
        </Segment>
      </div>
    )
  }
}

TopBar.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string
  }),
  rows: PropTypes.arrayOf(PropTypes.object)
}

TopBar.defaultProps = {
  file: {
    name: 'No Data Imported'
  },
  rows: []
}

export default TopBar;