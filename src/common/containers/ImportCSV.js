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
  importComplete as _importComplete,
  columnsUpdated as _columnsUpdated,
} from '../actionCreators/data';

class ImportCSV extends Component {
  constructor(props){
    super(props);
    this.onFileChosen = this.onFileChosen.bind(this);
  }

  onFileChosen(acceptedFiles) {
    const { fileChosen, importComplete, columnsUpdated } = this.props;
    if(acceptedFiles.length) {
      let [file] = acceptedFiles
      let sampleRow = null;
      
      fileChosen(file);
      localStorage.setItem(process.env.REACT_APP_FILE_NAME_KEY, file.name)
      db[process.env.REACT_APP_DB_TABLE_NAME].clear()
      .then(() => {
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: function(results) {
            sampleRow = results.data[0];
            const columns = Object.keys(sampleRow);
            columnsUpdated(columns);
            localStorage.setItem(process.env.REACT_APP_COLUMN_NAMES_KEY, columns);
            db[process.env.REACT_APP_DB_TABLE_NAME].bulkAdd(results.data)
            .then(() => {
              importComplete(results.data.length);
            })
          }
        });
      })
    }
  }

  render() {
    const { data } = this.props;
    return (
      <Modal trigger={
        <Button icon labelPosition='left' color="teal" size="small">
          <Icon name={data.importing ? 'circle notched' : 'upload'} loading={data.importing}/>
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
  importComplete: bindActionCreators(_importComplete, dispatch),
  columnsUpdated: bindActionCreators(_columnsUpdated, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCSV);