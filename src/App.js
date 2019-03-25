import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import 'semantic-ui-css/semantic.min.css'
import TopBar from './common/components/TopBar'

import {
  dataImported as _dataImported
} from './common/actionCreators/dataImported';

class App extends Component {
  render() {
    const { data, dataImported } = this.props;
    return (
      <div className="App">
        <TopBar 
          data={data}
          dataImported={dataImported}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch => ({
  dataImported: bindActionCreators(_dataImported, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
