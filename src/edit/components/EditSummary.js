import React from 'react';
import { parse, format } from 'date-fns'
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

function formatValue(filter) {
  if(['before', 'after'].includes(filter.operator)) {
    return format(parse(filter.value), 'Do MMM YYYY');
  }
  return filter.value;
}

const EditSummary = props => {
  const { field, operation, valueType, value, filters} = props;
  return (
    <Message color="yellow">
      <Message.Header>Bulk Operation Summary</Message.Header>
      <p>
        <strong>
          {`${start(field, operation)} ${end(field, operation, value, valueType)}`}
        </strong>
      </p>
      { filters.map((filter, index) => (
        <span key={`${filter.field}${filter.operator}${filter.value}`}>
          {index === 0 ? 'where' : 'and'} 
          {' '}
          {`${filter.field} ${filter.operator} ${formatValue(filter)}`}
          <br/>
        </span>
      ))}
    </Message>
  )
}

export default EditSummary;
