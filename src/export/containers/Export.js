import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Header, Input, Message, Button } from 'semantic-ui-react'
import * as Papa from 'papaparse';

import '../styles/Export.css';

function triggerDownload({ data, filename }) {
  const element = document.createElement('a');
  element.setAttribute('download', filename);

  element.setAttribute('href', URL.createObjectURL(data));

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

class Export extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: props.file.name.split('.').slice(null, -1).join('.'),
      exportType: 'CSV'
    }
    this.exportCSV = this.exportCSV.bind(this);
    this.exportJSON = this.exportJSON.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { name: prevFilename } = prevProps.file;
    const { name: filename } = this.props.file;
    if(prevFilename !== filename) {
      this.setState({
        filename: filename.split('.').slice(null, -1).join('.')
      })
    }
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }

  exportCSV() {
    const { rows } = this.props;
    const { filename } = this.state;
    const data = new Blob([Papa.unparse(rows)], {type : 'text/csv'});
    triggerDownload({ data, filename: `${filename}.csv` });
  }

  exportJSON() {
    const { rows } = this.props;
    const { filename } = this.state;
    const data = new Blob([JSON.stringify(rows, null, 2)], {type : 'application/json'});
    triggerDownload({ data, filename: `${filename}.json` });
  }

  export(e){
    const { exportType } = this.state;
    this[`export${exportType}`]()
  }

  render() {
    const { rows, totalRows } = this.props;

    const { filename } = this.state;

    return (
      <React.Fragment>
        <Header as="h4">CSV Export</Header>
        <Form onSubmit={this.export.bind(this)}>
          <Form.Field required>
            <label>File Name</label>
            <Input
              required
              type='text'
              value={filename}
              onChange={(e, data) => this.handleChange('filename', data.value)}
            />
          </Form.Field>
          <Message color="teal">
            <strong>{rows.length} of {totalRows} rows will be exported.</strong>
          </Message>
          <Form.Field>
            <Button
              color="orange" 
              onClick={() => this.setState({ exportType: 'CSV'})}
              content="Export as CSV"
              size="small"
            />
            <Button 
              color="purple" 
              onClick={() => this.setState({ exportType: 'JSON'})}
              content="Export as JSON"
              size="small"
            />
          </Form.Field>
        </Form>
      </React.Fragment>
    )
  }
} 

const mapStateToProps = state => ({
  file: state.data.file,
  rows: state.data.rows,
  totalRows: state.data.totalRows
})

export default connect(mapStateToProps)(Export);