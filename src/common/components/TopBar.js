import React, { Component } from 'react'
import { 
  Menu, 
  Segment,
  Button,
  Icon 
} from 'semantic-ui-react'

import '../styles/TopBar.css';
export default class MenuExampleInvertedSegment extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    return (
      <Segment>
        <Menu secondary>
          <Menu.Item header>
            Filename goes here
          </Menu.Item>
          <Menu.Item position="right">
            <Button icon labelPosition='left' color="teal" size="small">
              <Icon name='upload' />
              Import CSV
            </Button>
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}