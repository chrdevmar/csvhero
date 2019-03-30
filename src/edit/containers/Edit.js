import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Header, Input, Select } from 'semantic-ui-react'
import '../styles/Edit.css';

import TooltipLabel from '../../common/components/TooltipLabel';
import EditSummary from '../components/EditSummary';

import {
  applyBulkEdit as _applyBulkEdit
} from '../actionCreators';

import {
  removeFilter as _removeFilter
} from '../../common/actionCreators/data';

const operationOptions = [{
  key: 'set',
  value: 'set',
  text: 'Set To'
}, {
  key: 'clear',
  value: 'clear',
  text: 'Clear'
}, {
  key: '+',
  value: '+',
  text: 'Add'
}, {
  key: '-',
  value: '-',
  text: 'Subtract'
}, {
  key: '*',
  value: '*',
  text: 'Multiply By'
}, {
  key: '/',
  value: '/',
  text: 'Divide By',
}, {
  key: 'concat',
  value: 'concat',
  text: 'Concatenate',
}]

const valueTypeOptions = [{
  key: 'fixed',
  value: 'fixed',
  text: 'Fixed'
}, {
  key: 'dynamic',
  value: 'dynamic',
  text: 'Dynamic'
}]

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operation: operationOptions[0].value,
      field: '',
      valueType: 'fixed',
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.applyBulkEdit = this.applyBulkEdit.bind(this);
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }

  applyBulkEdit(){
    const { applyBulkEdit } = this.props;
    applyBulkEdit(this.state);
    this.setState({
      operation: operationOptions[0].value,
      field: '',
      valueType: 'fixed',
      value: '',
    });
  }

  render() {
    const { filters, columns, rows, isBulkUpdating, removeFilter } = this.props;
    const fieldOptions = columns.map(field => ({
      key: field,
      value: field,
      text: field
    }))

    const { field, operation, valueType, value} = this.state;

    return (
      <React.Fragment>
        <Header as="h4">Bulk Update</Header>
        <Form onSubmit={this.applyBulkEdit}>
          <Form.Group widths='equal'>
            <Form.Field required>
              <label>Field</label><TooltipLabel message="Field to perform operation on"/>
              <Select
                fluid
                required
                label="Field"
                options={fieldOptions} 
                placeholder='Field'
                value={field}
                onChange={(e, data) => this.handleChange('field', data.value)}
              />
            </Form.Field>
            <Form.Field required>
              <label>Operation</label><TooltipLabel message="Operation to perform on chosen field"/>
              <Select
                fluid
                required
                label='Operation' 
                options={operationOptions} 
                placeholder='Operation'
                value={operation}
                onChange={(e, data) => this.handleChange('operation', data.value)}
              />
            </Form.Field>
            <Form.Field required={operation !== 'clear'}>
              <label>Value Type</label>
              <TooltipLabel 
                message="Whether to use a fixed value, or a value stored in another column"
              />
              <Select
                disabled={operation === 'clear'}
                fluid
                required
                label='Value Type' 
                options={valueTypeOptions} 
                placeholder='Operation'
                value={valueType}
                onChange={(e, data) => this.handleChange('valueType', data.value)}
              />
            </Form.Field>
            {
              valueType === 'dynamic' ? (
                <Form.Field required={operation !== 'clear'}>
                  <label>Value</label>
                  <TooltipLabel 
                    message="Name of column to draw value from"
                  />
                  <Select
                    fluid
                    required
                    disabled={operation === 'clear'}
                    label='Value' 
                    options={fieldOptions} 
                    placeholder='Target Field'
                    value={value}
                    onChange={(e, data) => this.handleChange('value', data.value)}
                  />
                </Form.Field>
                ) : (
                <Form.Field required={operation !== 'clear'}>
                  <label>Value</label><TooltipLabel message="Value to use in operation"/>
                  <Input
                    fluid
                    required
                    disabled={operation === 'clear'}
                    type='text'
                    value={value}
                    onChange={(e, data) => this.handleChange('value', data.value)}
                  />
                </Form.Field>
              )
            }
          </Form.Group>
          <EditSummary 
            field={field} 
            operation={operation} 
            valueType={valueType} 
            value={value}
            filters={filters}
            removeFilter={removeFilter}
          />
          <Form.Button 
            color="orange" 
            content={`Apply to ${rows.length} filtered rows`} 
            size="small"
            loading={isBulkUpdating}
          />
        </Form>
      </React.Fragment>
    )
  }
} 

const mapStateToProps = state => ({
  filters: state.data.filters,
  columns: state.data.columns,
  rows: state.data.rows,
  isBulkUpdating: state.data.isBulkUpdating
})

const mapDispatchToProps = dispatch => ({
  applyBulkEdit: bindActionCreators(_applyBulkEdit, dispatch),
  removeFilter: bindActionCreators(_removeFilter, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);