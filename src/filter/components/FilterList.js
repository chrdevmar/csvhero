import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

const FilterList = props => {
  const { filters } = props;
  console.log('FILTERS', filters)
  return (
    <div>
      {filters.map(filter => (
        <Label as='a' key={`${filter.field}${filter.operator}${filter.value}`}>
          {`${filter.field} ${filter.operator} ${filter.value}`}
          <Icon name='delete' />
        </Label>
      ))}
    </div>
  ) 
}

export default FilterList