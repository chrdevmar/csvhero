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
    this.state = {
      operator: operatorOptions[0].value,
      field: '',
      value: '',
    }
    this.addFilter = this.addFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProp) {

  }

  addFilter(e){
    e.preventDefault();
    console.log('here', e)
    const { field, operator, value } = this.state;
    const { addFilter } = this.props;
    addFilter({ field, operator, value})
    this.setState({
      operator: operatorOptions[0].value,
      field: '',
      value: '',
    });
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
          <Form.Button color="orange" content="Add Filter" size="small"/>
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