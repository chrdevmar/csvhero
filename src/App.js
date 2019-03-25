import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css'
import TopBar from './common/components/TopBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

export default connect(mapStateToProps)(App);
