import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react'
import * as Papa from 'papaparse';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import db from '../../util/db';
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
      let sampleRow = null;
      fileChosen(file);
      db[process.env.REACT_APP_INDEXED_DB_TABLE_NAME].clear()
      .then(() => {
        Papa.parse(file, {
          header: true,
          step: function(results) {
            if(!sampleRow) {
              sampleRow = results.data[0];
            }
            db[process.env.REACT_APP_INDEXED_DB_TABLE_NAME].put(results.data[0])
            rowParsed(results.data[0]);
          },
          complete: function() {
            importComplete();
            let columns = Object.keys(sampleRow);
            localStorage.setItem(process.env.REACT_APP_COLUMN_NAMES_KEY, columns);
          }
        });
      })
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