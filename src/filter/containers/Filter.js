import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Checkbox, Form } from 'semantic-ui-react'

class Filter extends Component {

  render() {
    return (
      <Form>
        <Form.Field>
          <label>Active Filters</label>
          {}
        </Form.Field>
        <Form.Field>
          <label>Add Filter</label>
          <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
          <label>Add Sort</label>
          <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
} 

const mapStateToProps = state => ({
  filters: state.data.filters,
  columns: state.data.columns
})

// const mapDispatchToProps = dispatch => ({
//   removeFilter: 
// })

export default connect(mapStateToProps)(Filter);