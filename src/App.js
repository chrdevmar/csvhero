import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import SplitPane from 'react-split-pane';
import TopBar from './common/components/TopBar'
import RowViewer from './common/containers/RowViewer';

class App extends Component {
  render() {
    const { data } = this.props;
    return (
      <div id="App">
        <TopBar
          file={data.file}
          rows={data.rows}
        />
        <div id="AppContent">
          <SplitPane split="horizontal" defaultSize={500} minSize={100} primary="second">
            <div>
            </div>
            <RowViewer/>
          </SplitPane>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

export default connect(mapStateToProps)(App);
