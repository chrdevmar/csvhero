import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react'
import * as Papa from 'papaparse';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ImportSummary from '../components/ImportSummary';
import Dropzone from 'react-dropzone';

import {
  fileChosen as _fileChosen,
  rowParsed as _rowParsed,
  importComplete as _importComplete,
} from '../actionCreators/data';

class ImportCSV extends Component {
  constructor(props){
    super(props);
    this.onFileChosen = this.onFileChosen.bind(this);
  }

  onFileChosen(acceptedFiles) {
    const { fileChosen, rowParsed, importComplete } = this.props;
    if(acceptedFiles.length) {
      let [file] = acceptedFiles
      fileChosen(file);
      Papa.parse(file, {
        header: true,
        step: function(results) {
          rowParsed(results.data[0]);
        },
        complete: function() {
          importComplete();
        }
      });
    } else {
      fileChosen({});
    }
  }

  render() {
    const { data } = this.props;
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
          <Dropzone onDrop={this.onFileChosen}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <ImportSummary
                      {...data}
                    />    
                  </div>
                </section>
              )}
            </Dropzone>

        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch => ({
  fileChosen: bindActionCreators(_fileChosen, dispatch),
  rowParsed: bindActionCreators(_rowParsed, dispatch),
  importComplete: bindActionCreators(_importComplete, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCSV);