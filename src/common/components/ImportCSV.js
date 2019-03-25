import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react'

class ImportCSV extends Component {
  constructor(props){
    super(props);
    this.onFileChosen = this.onFileChosen.bind(this);
  }

  onFileChosen(e) {
    e.preventDefault();
    console.log('FILE WAS CHOSEN', e.target);
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      const { dataImported } = this.props;
      dataImported(file);
    }

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <Modal trigger={
        <Button icon labelPosition='left' color="teal" size="small">
          <Icon name='upload' />
          Import CSV
          </Button>
        }
      >
        <Modal.Header>Import CSV Data From File</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <input type="file" onChange={this.onFileChosen}/>
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ImportCSV