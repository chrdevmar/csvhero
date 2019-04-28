import React, { Component } from 'react';
import { Button, Icon, Confirm, Message } from 'semantic-ui-react'
import * as Papa from 'papaparse';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import db from '../../util/db';
import Dropzone from 'react-dropzone';

import '../styles/ImportCSV.css';

import {
  fileChosen as _fileChosen,
  importComplete as _importComplete,
  columnsUpdated as _columnsUpdated,
} from '../actionCreators/data';

class ImportCSV extends Component {
  constructor(props){
    super(props);
    this.onFileChosen = this.onFileChosen.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      fileTooBig: false
    }
  }

  importFile(file) {
    const { fileChosen, importComplete, columnsUpdated } = this.props;    
    let columnsSet = false;
    let rowCount = 0;
    fileChosen(file);
    localStorage.setItem(process.env.REACT_APP_FILE_NAME_KEY, file.name)
    db[process.env.REACT_APP_DB_TABLE_NAME].clear()
    .then(() => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        chunk: function(results) {
          console.log('FINISHED A CHUNK', results);
          if(!columnsSet) {
            columnsUpdated(results.meta.fields);
          }
          rowCount += results.data.length;
          db[process.env.REACT_APP_DB_TABLE_NAME].bulkAdd(results.data);
        },
        complete: function() {
          importComplete(rowCount);
        }
      });
    })
  }

  onFileChosen(acceptedFiles) {

    if(acceptedFiles.length) {
      const [file] = acceptedFiles;
      if(file.size <= process.env.REACT_APP_MAX_FILE_SIZE){
        this.importFile(file);
      } else {
        this.setState({
          fileTooBig: true
        })
      }
    }
  }

  closeModal() {
    this.setState({
      fileTooBig: false
    })
  }

  render() {
    const { data } = this.props;
    const { fileTooBig } = this.state;
    return (
      <React.Fragment>
        <Dropzone onDrop={this.onFileChosen}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button loading={data.importing} disabled={data.importing} icon labelPosition='left' color="teal" size="small">
                  <Icon name={data.importing ? 'circle notched' : 'upload'} />
                  Import CSV
                </Button>
              </div>
            </section>
          )}
        </Dropzone>
        <Confirm 
          open={fileTooBig} 
          onCancel={this.closeModal} 
          onConfirm={this.closeModal}
          header="File too large"
          content={(
            <div className="file-too-big-content">
              <Message color="orange">
                <Message.Header>Sorry about that</Message.Header>
                If we try to process this file, 
                your computer will curl up in the fetal position and cry.<br/>
                We are working on supporting larger files.
              </Message>
            </div>
          )}
        />
      </React.Fragment>
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