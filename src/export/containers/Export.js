import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Header, Input } from 'semantic-ui-react'
import * as Papa from 'papaparse';

import '../styles/Export.css';

class Export extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: props.file.name
    }
    this.export = this.export.bind(this);
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }

  export() {
    const { rows } = this.props;
    const { filename } = this.state;
    const csv = Papa.unparse(rows);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + csv);
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  render() {
    const { rows } = this.props;

    const { filename } = this.state;

    return (
      <React.Fragment>
        <Header as="h4">CSV Export</Header>
        <Form onSubmit={this.export}>
          <Form.Field required>
            <label>File Name</label>
            <Input
              required
              type='text'
              value={filename}
              onChange={(e, data) => this.handleChange('filename', data.value)}
            />
          </Form.Field>
          <Form.Button 
            color="teal" 
            content={`Export ${rows.length} filtered rows`} 
            size="small"
          />
        </Form>
      </React.Fragment>
    )
  }
} 

const mapStateToProps = state => ({
  file: state.data.file,
  rows: state.data.rows,
})

export default connect(mapStateToProps)(Export);