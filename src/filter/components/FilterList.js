import React from 'react';
import PropTypes from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';
import '../styles/FilterList.css';

const labelColorMap = {
  '=': 'green',
  '<': 'blue',
  '>': 'purple'
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
                {`${filter.field} ${filter.operator} ${filter.value}`}
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