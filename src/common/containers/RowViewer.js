import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import '../styles/RowViewer.css'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  fetchFilteredRows as _fetchFilteredRows,
  countTotalRows as _countTotalRows,
} from '../actionCreators/data';


class RowViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      ready: false,
      rowCount: 0
    }
  }

  componentDidMount(){
    const { fetchFilteredRows, countTotalRows } = this.props;
    countTotalRows();
    fetchFilteredRows();
  }
  
  componentDidUpdate(prevProps){
    const { rows } = this.props.data;
    const { rows: prevRows } = prevProps.data;
    // get columns names from localStorage
    let columnsStr = localStorage.getItem(process.env.REACT_APP_COLUMN_NAMES_KEY);
    if(columnsStr) {
      const columns = columnsStr.split(',').map(col => ({
        key: col,
        name: col
      }));
      if(rows.length !== prevRows.length) {
        this.setState({
          columns,
          ready: true,
          rowCount: rows.length
        });
      }
    }
  }

  render() {
    const { rows, totalRows } = this.props.data;
    const rowGetter = index => rows[index]
    
    const { ready, columns, rowCount } = this.state;
    if(ready) {
      return (
        <div className="rowViewerPanel">
          <div className="rowViewerHeader">
            <strong>Showing {rowCount} of { totalRows } rows</strong>
          </div>
          <ReactDataGrid
            columns={columns}
            rowGetter={rowGetter}
            rowsCount={rowCount}
          />
        </div>
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

const mapDispatchToProps = dispatch => ({
  fetchFilteredRows: bindActionCreators(_fetchFilteredRows, dispatch),
  countTotalRows: bindActionCreators(_countTotalRows, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RowViewer);