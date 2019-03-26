import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import '../styles/RowViewer.css'

class RowViewer extends Component {
  componentDidMount(){
    console.log('ROW VIEWER MOUNTED');
  }

  render() {
    const columns = [{ key: 'id', name: 'ID' }, { key: 'title', name: 'Title' }];
    const rows = [{ id: 1, title: 'Title 1' }];
    const rowGetter = rowNumber => rows[rowNumber];
    return (
      <ReactDataGrid
      columns={columns}
      rowGetter={rowGetter}
      rowsCount={rows.length}
      minHeight={500} />
    )
  }
}

export default RowViewer;