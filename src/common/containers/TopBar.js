import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  countTotalRows as _countTotalRows,
} from '../actionCreators/data';

import '../styles/TopBar.css';

import ImportCSV from './ImportCSV';
class TopBar extends Component {

  componentDidMount(){
    const { countTotalRows } = this.props;
    countTotalRows();
  }

  render() {
    const { file, totalRows } = this.props.data;
    return (
      <div id="topBarRoot">
        <Segment>
          <Menu secondary>
            <Menu.Item header>
              { file.name }
              { totalRows ? ` (${totalRows} rows)` : null}
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
  totalRows: PropTypes.number
}

TopBar.defaultProps = {
  totalRows: null
}

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  countTotalRows: bindActionCreators(_countTotalRows, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);