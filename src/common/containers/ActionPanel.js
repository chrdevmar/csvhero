import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import '../styles/ActionPanel.css';

class ActionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'Filter' }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick (e, { name }){ 
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <React.Fragment>
        <Menu pointing secondary vertical>
          <Menu.Item name='Filter' active={activeItem === 'Filter'} onClick={this.handleItemClick} />
          <Menu.Item
            name='Edit'
            active={activeItem === 'Edit'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Visualise'
            active={activeItem === 'Visualise'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Export'
            active={activeItem === 'Export'}
            onClick={this.handleItemClick}
          />
        </Menu>
        <div>Content goes here</div>
      </React.Fragment>
    )
  }
}

export default ActionPanel; 