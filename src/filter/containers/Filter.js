import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Header } from 'semantic-ui-react'

import FilterList from '../components/FilterList';

import {
  addFilter as _addFilter,
  removeFilter as _removeFilter
} from '../../common/actionCreators/data';

const operatorOptions = [{
  key: 'eq',
  value: '=',
  text: 'Equals'
}, {
  key: 'gt',
  value: '>',
  text: 'Greater Than'
}, {
  key: 'lt',
  value: '<',
  text: 'Less Than'
}]

class Filter extends Component {
  constructor(props) {
    super(props);
    const { columns } = props;
    this.fieldOptions = columns.map(field => ({
      key: field,
      value: field,
      text: field
    }))
    this.state = {
      operator: operatorOptions[0].value,
      field: this.fieldOptions.length ? this.fieldOptions[0].value : '',
      value: '',
    }
    this.addFilter = this.addFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addFilter(e){
    e.preventDefault();
    console.log('here', e)
    const { field, operator, value } = this.state;
    const { addFilter } = this.props;
    addFilter({ field, operator, value})
    this.setState({
      operator: operatorOptions[0].value,
      field: this.fieldOptions.length ? this.fieldOptions[0].value : '',
      value: '',
    });
  }

  

  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }

  render() {
    const { fieldOptions } = this;
    const { filters } = this.props;
    const { operator, field, value } = this.state;
    return (
      <React.Fragment>
        <Header as="h4">Active Filters</Header>
        <FilterList filters={filters}/>
        <Header as="h4">Add Filter</Header>
        <Form onSubmit={this.addFilter}>
          <Form.Group widths='equal'>
            <Form.Select 
              fluid 
              label='Field' 
              options={fieldOptions} 
              placeholder='Field'
              value={field}
              onChange={(e, data) => this.handleChange('field', data.value)}
            />
            <Form.Select 
              fluid 
              label='Operator' 
              options={operatorOptions} 
              placeholder='Operator'
              value={operator}
              onChange={(e, data) => this.handleChange('operator', data.value)}
            />
            <Form.Input 
              fluid 
              label='Value' 
              placeholder='Value' 
              value={value}
              onChange={(e, data) => this.handleChange('value', data.value)}
            />
          </Form.Group>
          <Form.Button color="orange" content="Add Filter" />
        </Form>
      </React.Fragment>
    )
  }
} 

const mapStateToProps = state => ({
  filters: state.data.filters,
  columns: state.data.columns
})

const mapDispatchToProps = dispatch => ({
  addFilter: bindActionCreators(_addFilter, dispatch),
  removeFilter: bindActionCreators(_removeFilter, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);