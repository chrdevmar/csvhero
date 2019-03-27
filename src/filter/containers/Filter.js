import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Header } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import '../styles/Filter.css';

import FilterList from '../components/FilterList';

import {
  addFilter as _addFilter,
  removeFilter as _removeFilter
} from '../../common/actionCreators/data';

const operatorOptions = [{
  key: 'eq',
  value: '=',
  text: 'Is Equal To'
}, {
  key: 'not',
  value: 'not',
  text: 'Is Not Equal To'
}, {
  key: 'gt',
  value: '>',
  text: 'Is Greater Than'
}, {
  key: 'lt',
  value: '<',
  text: 'Is Less Than'
}, {
  key: 'in',
  value: 'in',
  text: 'Is In',
}, {
  key: 'notin',
  value: 'not in',
  text: 'Is Not In',
}, {
  key: 'contains',
  value: 'contains',
  text: 'Contains',
}, {
  key: 'before',
  value: 'before',
  text: 'Is Before'
}, {
  key: 'after',
  value: 'after',
  text: 'Is After'
}]

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: operatorOptions[0].value,
      field: '',
      value: '',
    }
    this.addFilter = this.addFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cleanInput = this.cleanInput.bind(this);
  }

  addFilter(e){
    e.preventDefault();
    const { field, operator, value } = this.state;
    const { addFilter } = this.props;
    addFilter({ field, operator, value})
    this.setState({
      operator: operatorOptions[0].value,
      field: '',
      value: '',
    });
  }

  getInputProps() {
    const { operator } = this.state;
    let props = {
      type: 'text',
      placeholder: 'Value'
    }
    switch(operator) {
      case '>':
      case '<':
        props.type = 'number';
        props.step = '0.000001'
        break;
      case 'in':
      case 'not in':
        props.placeholder = 'Comma seperated values'
        break;
      default:
        break;
    }
    return props;
  }

  cleanInput(input) {
    const { operator } = this.state;
    switch(operator) {
      case 'in':
      case 'not in':
        return input.replace(/\s/g, '')
      default:
        return input
    }
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }

  render() {
    const { columns } = this.props;
    const fieldOptions = columns.map(field => ({
      key: field,
      value: field,
      text: field
    }))
    const { filters, removeFilter } = this.props;
    const { operator, field, value } = this.state;
    return (
      <React.Fragment>
        <Header as="h4">Active Filters</Header>
        <FilterList filters={filters} removeFilter={removeFilter}/>
        <Header as="h4">Add Filter</Header>
        <Form onSubmit={this.addFilter}>
          <Form.Group widths='equal'>
            <Form.Select 
              fluid
              required
              label='Field' 
              options={fieldOptions} 
              placeholder='Field'
              value={field}
              onChange={(e, data) => this.handleChange('field', data.value)}
            />
            <Form.Select 
              fluid
              required
              label='Operator' 
              options={operatorOptions} 
              placeholder='Operator'
              value={operator}
              onChange={(e, data) => this.handleChange('operator', data.value)}
            />
            {
              ['before', 'after'].includes(operator) ? (
                <Form.Input
                  required
                  control={SemanticDatepicker}
                  className="date-picker-filter-input"
                  onDateChange={date => this.handleChange('value', date)}
                  value={value}
                  label="Value"
                />
                ) : (
                <Form.Input
                  fluid 
                  required
                  label='Value' 
                  {...this.getInputProps()}
                  value={value}
                  onChange={(e, data) => this.handleChange('value', this.cleanInput(data.value))}
                />
              )
            }
          </Form.Group>
          <Form.Button color="teal" content="Add Filter" size="small"/>
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