import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css'
import TopBar from './common/components/TopBar'

class App extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="App">
        <TopBar 
          file={data.file}
          rows={data.rows}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

export default connect(mapStateToProps)(App);
