import React from 'react';
import PropTypes from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';
import { parse, format } from 'date-fns'
import '../styles/FilterList.css';

const labelColorMap = {
  '=': 'green',
  'not': 'red',
  '<': 'blue',
  '>': 'purple',
  'one of': 'violet',
  'not one of': 'pink',
  'after': 'orange',
  'before': 'olive',
  'contains': 'yellow',
  'is empty': 'brown',
}

function formatValue(filter) {
  if(['before', 'after'].includes(filter.operator)) {
    return format(parse(filter.value), 'Do MMM YYYY');
  }
  return filter.value;
}

const FilterList = props => {
  const { filters, removeFilter, size } = props;
  return (
    <div className="filter-list">
      {
        filters.length ? (
          <div>
            {filters.map((filter, index) => (
              <Label 
                key={`${filter.field}${filter.operator}${filter.value}`} 
                color={labelColorMap[filter.operator]}
                size={size}
                >
                {`${filter.field} ${filter.operator} ${formatValue(filter)}`}
                <Icon 
                  name='delete'
                  onClick={() => removeFilter(index)}
                />
              </Label>
            ))}
          </div>
        ) : (
          <Label 
          key="nofilters" 
          size={size}
          >
            No Active Filters
        </Label>
        )
      }
    </div>
  ) 
}

FilterList.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  removeFilter: PropTypes.func.isRequired,
  size: PropTypes.string,
}

FilterList.defaultProps = {
  filters: [],
  size: 'medium',
}

export default FilterList