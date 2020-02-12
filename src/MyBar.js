import React, { Component } from 'react';
import {AppBar, Drawer, MenuItem, Menu} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class MyBar extends Component {

  constructor () {
    super()
    this.selectedMenuItem = ""
  }

  menuClicked (ev, value) {
    this.selectedMenuItem = value
    alert(this.selectedMenuItem)
    console.log(this.selectedMenuItem)
  }

  render() {
    const dataList = [];

    for(var i in this.props.jsonData){
      dataList.push(this.props.jsonData[i]);
    }

    return (
      <MuiThemeProvider>
        <div>
          <Drawer
            docked={false}
            width={200}
            open={this.props.open}
            onRequestChange={() => this.props.onToggle()}
          >
            <Menu value={this.selectedMenuItem} onChange={this.menuClicked}>
            { dataList.map(data => {
              return (
                <MenuItem value={data.id}>{data.name}</MenuItem>
              )
            }) }
            </Menu>
          </Drawer>
          <AppBar
            title="React Study"
            onLeftIconButtonClick={() => this.props.onToggle()}
            onLeftIconButtonTouchTap={() => this.props.onToggle()}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MyBar;
