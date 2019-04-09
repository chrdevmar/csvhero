import React from 'react';
import { Message, Label } from 'semantic-ui-react';

import FilterList from '../../filter/components/FilterList'
import '../styles/EditSummary.css';

function start(field, operation) {
  switch (operation){
    case 'set':
      return <span>
        Set the value of <Label content={field || <i>Choose a Field</i>} color="teal"/> {'to '}
      </span>
    case 'clear':
      return <span>{'Clear '}</span>;
    case '+':
      return <span>{'Add '}</span>;
    case '-':
      return <span>{'Subtract '}</span>;
    case '*':
      return <span>
        Multiply the value of  <Label content={field || <i>Choose a Field</i>} color="teal"/> {'by '}
      </span>;
    case '/':
      return <span>
        Divide the value of <Label content={field || <i>Choose a Field</i>} color="teal"/> {'by '}
      </span>;
    case 'concat':
      return <span>
        Concatenate the value of <Label content={field || <i>Choose a Field</i>} color="teal"/> {'with '} 
      </span>;
    default: 
      break;
  }
}

function end(field, operation, value, valueType) {
  switch(operation) {
    case 'set':
      if(valueType === 'fixed') {
        return <Label content={value || <i>Enter a Value</i>} color="teal"/>;
      }
      return <span>
        the value of <Label content={value || <i>Choose a Field</i>} color="teal"/>
      </span>
    case 'clear':
      return <span>
        the value of <Label content={field || <i>Choose a Field</i>} color="teal"/>
      </span>
    case '+':
      if(valueType === 'fixed') {
        return <span>
         <Label content={value || <i>Enter a Value</i>} color="teal"/>
         {' to the value of '}
         <Label content={field || <i>Choose a Field</i>} color="teal"/>
        </span>
      }
      return <span>
        {' the value of '}
        <Label content={value || <i>Choose a Field</i>} color="teal"/>
        {' to the value of '} 
        <Label content={field || <i>Choose a Field</i>} color="teal"/>
      </span>
    case '-':
      if(valueType === 'fixed') {
        return <span>
        <Label content={value || <i>Enter a Value</i>} color="teal"/>
        {' from the value of '}
        <Label content={field || <i>Choose a Field</i>} color="teal"/>
        </span>
      }
      return <span>
        {' the value of '}
        <Label content={value || <i>Choose a Field</i>} color="teal"/>
        {' from the value of '} 
        <Label content={field || <i>Choose a Field</i>} color="teal"/>
      </span>
    case '*':
      if(valueType === 'fixed') {
        return <span>
        <Label content={value || <i>Enter a Value</i>} color="teal"/>
        </span>
      }
      return <span>
        {' the value of '}
        <Label content={value || <i>Choose a Field</i>} color="teal"/>
      </span>
    case '/':
      if(valueType === 'fixed') {
        return <span>
        <Label content={value || <i>Enter a Value</i>} color="teal"/>
        </span>
      }
      return <span>
        {' the value of '}
        <Label content={value || <i>Choose a Field</i>} color="teal"/>
      </span>
    case 'concat':
      if(valueType === 'fixed') {
        return <span>
        <Label content={value || <i>Enter a Value</i>} color="teal"/>
        </span>
      }
      return <span>
        {' the value of '}
        <Label content={value || <i>Choose a Field</i>} color="teal"/>
      </span>
    default: 
    break;
  }
}

const EditSummary = props => {
  const { field, operation, valueType, value, filters, removeFilter} = props;
  return (
    <Message color="teal">
      <Message.Header>Bulk Update Summary</Message.Header>
      <div className="edit-summary-sentence">
        <strong>
          { start(field, operation) }
          { end(field, operation, value, valueType) }
        </strong>
      </div>
      {
        filters.length ? (
          <React.Fragment>
            <strong>Where </strong><br/>
            <FilterList filters={filters} removeFilter={removeFilter} newlines/>
          </React.Fragment>
        ) : null
      }
    </Message>
  )
}

export default EditSummary;
