import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import '../styles/ImportSummary.css';

class ImportSummary extends Component {
  constructor(props){
    super(props);
    this.getSummaryIcon = this.getSummaryIcon.bind(this);
    this.getSummaryHeader = this.getSummaryHeader.bind(this);
  }

  getSummaryIcon(){
    const { file, importing} = this.props;
    if(file.size && importing) {
      return 'circle notched';
    } else if (file.size && !importing) {
      return 'check circle outline';
    }
    return 'upload'
  }

  getSummaryHeader(){
    const { file, importing } = this.props;
    if(file.size && importing) {
      return 'Importing Data';
    } else if (!file.size && !importing) {
      return 'Choose File To Import';
    }
    return 'Done Importing Data';
  }

  render() {
    const { totalRows, importing, file } = this.props;
    return (
      <React.Fragment>
        <Message icon color="teal">
          <Icon name={this.getSummaryIcon()} loading={importing} />
          <Message.Content>
            <Message.Header>
              {this.getSummaryHeader()}
            </Message.Header>
            { file.name }
            {' '}
            { totalRows ? `(${ totalRows } totalRows imported)` : null}
          </Message.Content>
        </Message>
      </React.Fragment>
    );
  }
}

export default ImportSummary;


ImportSummary.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string
  }),
  totalRows: PropTypes.number,
  importing: PropTypes.bool
}

ImportSummary.defaultProps = {
  file: {
    name: 'No File Imported'
  },
  totalRows: 0,
  importing: false
}
