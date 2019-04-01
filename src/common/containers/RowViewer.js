import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import '../styles/RowViewer.css'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FilterList from '../../filter/components/FilterList';

import { Icon } from 'semantic-ui-react';

import {
  fetchFilteredRows as _fetchFilteredRows,
  countTotalRows as _countTotalRows,
  removeFilter as _removeFilter,
  updateRow as _updateRow,
} from '../actionCreators/data';


class RowViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      ready: false,
      rowCount: 0
    }
    this.updateRow = this.updateRow.bind(this)
  }

  componentDidMount(){
    const { fetchFilteredRows, countTotalRows } = this.props;
    countTotalRows();
    fetchFilteredRows();
  }

  updateRow({ fromRow, updated }) {
    const { updateRow } = this.props;
    updateRow({
      fromRow,
      updated
    });
  }

  render() {
    const { rows, columns, totalRows, filters, fetching } = this.props.data;
    const mappedColumns = columns.map(col => ({
      key: col,
      name: col,
      formatter: ({ value }) => {
        if(typeof value === 'object') {
          return JSON.stringify(value);
        }
        return value
      },
      resizable: true,
      editable: true
    }));
    const { removeFilter } = this.props;
    const rowGetter = index => rows[index]
    
    return (
      <div className="row-viewer-panel">
        <div className="row-viewer-header">
          <strong className="row-viewer-header-content">
            Showing
            {' '}{ fetching ? (<Icon name="circle notched" loading></Icon>) : rows.length}{' '} 
            of { totalRows } rows
          </strong>
          <FilterList filters={filters} removeFilter={removeFilter} size="small"/>
        </div>
        <ReactDataGrid
          minHeight={window.innerHeight - 120}
          columns={mappedColumns}
          rowGetter={rowGetter}
          enableCellSelect
          onGridRowsUpdated={this.updateRow}
          rowsCount={rows.length}
        />
      </div>
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
  updateRow: bindActionCreators(_updateRow, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RowViewer);