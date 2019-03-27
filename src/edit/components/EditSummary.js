import React from 'react';
import { Message } from 'semantic-ui-react';

function start(field, operation) {
  switch (operation){
    case 'set':
      return `Set the value of '${field}' to`;
    case 'clear':
      return `Clear`;
    case '+':
      return `Add`;
    case '-':
      return `Subtract`;
    case '*':
      return `Multiply the value of '${field}' by`;
    case '/':
      return `Divide the value of '${field}' by`;
    case 'concat':
      return `Concatenate the value of '${field}' with`;
    default: 
      break;
  }
}

function end(field, operation, value, valueType) {
  switch(operation) {
    case 'set':
      if(valueType === 'fixed') {
        return `${value}`;
      }
      return `the value of '${value}'`
    case 'clear':
      return `the value of '${field}'`
    case '+':
      if(valueType === 'fixed') {
        return `${value} to the value of '${field}'`;
      }
      return `the value of '${value}' to the value of '${field}'`
    case '-':
      if(valueType === 'fixed') {
        return `${value} from the value of '${field}'`;
      }
      return `the value of '${value}' from the value of '${field}'`
    case '*':
      if(valueType === 'fixed') {
        return `${value}`;
      }
      return `the value of '${value}'`
    case '/':
      if(valueType === 'fixed') {
        return `${value}`;
      }
      return `the value of '${value}'`
    case 'concat':
      if(valueType === 'fixed') {
        return `'${value}'`;
      }
      return `the value of '${value}'`
    default: 
    break;
  }
}

const EditSummary = props => {
  const { field, operation, valueType, value} = props;
  return (
    <Message color="yellow">
      <Message.Header>Bulk Operation Summary</Message.Header>
      {`${start(field, operation)} ${end(field, operation, value, valueType)}`}
    </Message>
  )
}

export default EditSummary;
