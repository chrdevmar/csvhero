import React from 'react'
import PropTypes from 'prop-types';
import { Icon, Popup } from 'semantic-ui-react';

const TooltipLabel = props => {
  return (
    <Popup trigger={<Icon name="help circle"/>} content={props.message} />
  )
}

TooltipLabel.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
  position: PropTypes.string
}

export default TooltipLabel