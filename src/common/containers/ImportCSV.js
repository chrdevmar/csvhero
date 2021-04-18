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
  resetDemoData as _resetDemoData,
} from '../actionCreators/data';

class ImportCSV extends Component {
  constructor(props){
    super(props);
    this.onFileChosen = this.onFileChosen.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.state = {
      fileTooBig: false,
      confirmDemoData: false
    }
  }

  importFile(file) {
    const { fileChosen, importComplete, columnsUpdated } = this.props;

    fileChosen(file);
    localStorage.setItem(process.env.REACT_APP_FILE_NAME_KEY, file.name)
    db[process.env.REACT_APP_DB_TABLE_NAME].clear()
    .then(() => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
          const columns = results.meta.fields;
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

  closeConfirm(key) {
    this.setState({
      [key]: false
    })
  }

  render() {
    const { data, resetDemoData } = this.props;
    const { fileTooBig, confirmDemoData } = this.state;
    return (
      <React.Fragment>
        <Dropzone onDrop={this.onFileChosen} accept="text/csv">
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
        <section>
          <Button
            basic icon labelPosition='left' size="small"
            onClick={() => this.setState({confirmDemoData: true})}>
            <Icon name="book" />
            Demo Data
          </Button>
        </section>
        <Confirm
          open={fileTooBig}
          onCancel={() => this.closeConfirm('fileTooBig')}
          onConfirm={() => this.closeConfirm('fileTooBig')}
          header="File too large"
          content={(
            <div className="confirmation-content">
              <Message color="orange">
                <Message.Header>Sorry about that</Message.Header>
                If we try to process this file,
                your computer will curl up in the fetal position and cry.<br/>
                We are working on supporting larger files.
              </Message>
            </div>
          )}
        />
        <Confirm
          open={confirmDemoData}
          onCancel={() => this.closeConfirm('confirmDemoData')}
          onConfirm={() => {
            this.closeConfirm('confirmDemoData');
            resetDemoData()
          }}
          header="Reset demo data"
          content={(
            <div className="confirmation-content">
              <Message color="orange">
                <Message.Header>Reset demo data</Message.Header>
                Are you sure? This will replace your working dataset with demo sales data.<br/>
                Please make sure any changes you wish to keep are exported.
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
  resetDemoData: bindActionCreators(_resetDemoData, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCSV);