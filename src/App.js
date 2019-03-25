import React, { Component } from 'react';

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

export default App;
