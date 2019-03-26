import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import '../styles/RowViewer.css'
import { connect } from 'react-redux';

class RowViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      ready: false,
      rowsCount: 0
    }
  }
  
  componentDidUpdate(prevProps){
    console.log('ROW VIEWER UPDATED', prevProps.data);
    const { rows } = this.props.data;
    const { rows: prevRows } = prevProps.data;
    // get columns names from localStorage
    let columnsStr = localStorage.getItem(process.env.REACT_APP_COLUMN_NAMES_KEY);
    if(columnsStr) {
      const columns = columnsStr.split(',').map(col => ({
        key: col,
        name: col
      }));
      if(prevRows.length !== rows.length) {
        this.setState({
          columns,
          ready: true,
          rowsCount: rows.length
        });
      }
    }
  }

  render() {
    const { rows } = this.props.data;
    const rowGetter = index => rows[index]
    
    const { ready, columns, rowsCount } = this.state;
    if(ready) {
      return (
        <ReactDataGrid
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={rowsCount}
        />
      )
    }
    return (
      <span>loading...</span>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps)(RowViewer);