import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import '../styles/RowViewer.css'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _debounce from 'lodash.debounce';

import FilterList from '../../filter/components/FilterList';

import { Icon } from 'semantic-ui-react';

import {
  fetchFilteredRows as _fetchFilteredRows,
  countFilteredRows as _countFilteredRows,
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
    this.updateRow = this.updateRow.bind(this);
    this.fetchRows = this.fetchRows.bind(this);
  }

  componentDidMount(){
    const { fetchFilteredRows, countTotalRows, countFilteredRows } = this.props;
    countTotalRows();
    countFilteredRows();
    console.log('COMPONENT MOUNTED')
    fetchFilteredRows({
      offset: 0,
      limit: 60
    });
  }

  fetchRows({ offset, limit}) {
    const { fetchFilteredRows } = this.props;
    fetchFilteredRows({
      offset,
      limit
    })
  }

  updateRow({ fromRow, updated }) {
    const { updateRow } = this.props;
    updateRow({
      fromRow,
      updated
    });
  }

  render() {
    const { rows, columns, totalRows, filters, countingFilteredRows, filteredRowCount } = this.props.data;
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
            {' '}{ countingFilteredRows ? (<Icon name="circle notched" loading></Icon>) : filteredRowCount}{' '} 
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
          rowsCount={filteredRowCount}
          onScroll={_debounce(({ rowOverscanStartIdx, rowOverscanEndIdx}) => {
              this.fetchRows({
                offset: rowOverscanStartIdx,
                limit: rowOverscanEndIdx - rowOverscanStartIdx
              })
            }, 200)}
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
  countFilteredRows: bindActionCreators(_countFilteredRows, dispatch),
  countTotalRows: bindActionCreators(_countTotalRows, dispatch),
  removeFilter: bindActionCreators(_removeFilter, dispatch),
  updateRow: bindActionCreators(_updateRow, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RowViewer);