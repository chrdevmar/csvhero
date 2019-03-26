import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import '../styles/RowViewer.css'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FilterList from '../../filter/components/FilterList';

import {
  fetchFilteredRows as _fetchFilteredRows,
  countTotalRows as _countTotalRows,
  removeFilter as _removeFilter,
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
    const { rows, columns } = this.props.data;
    const { rows: prevRows } = prevProps.data;
    // get columns names from localStorage
    if(columns.length) {
      const mappedColumns = columns.map(col => ({
        key: col,
        name: col,
        formatter: ({ value }) => {
          if(typeof value === 'object') {
            return JSON.stringify(value);
          }
          return value
        }
      }));
      if(rows.length !== prevRows.length) {
        this.setState({
          columns: mappedColumns,
          ready: true,
          rowCount: rows.length
        });
      }
    }
  }

  render() {
    const { rows, totalRows, filters } = this.props.data;
    const { removeFilter } = this.props;
    const rowGetter = index => rows[index]
    
    const { ready, columns, rowCount } = this.state;
    if(ready) {
      return (
        <div className="row-viewer-panel">
          <div className="row-viewer-header">
            <strong className="row-viewer-header-content">
              Showing {rowCount} of { totalRows } rows
            </strong>
            <FilterList filters={filters} removeFilter={removeFilter} size="small"/>
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
  countTotalRows: bindActionCreators(_countTotalRows, dispatch),
  removeFilter: bindActionCreators(_removeFilter, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(RowViewer);