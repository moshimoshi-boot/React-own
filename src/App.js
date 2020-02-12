import React, { Component } from 'react';
import logo from './logo.svg';
import fetch from 'node-fetch';
import './App.css';
import MyBar from './MyBar';

class App extends Component {

  constructor () {
    super()
    this.state = {
      loading: false,
      open: false
    }
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  componentWillMount () {
    const URL = 'http://localhost:8080/characters/json'
    return fetch(URL)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        data: responseJson
      })
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <MyBar
            onToggle={() => this.handleToggle()}
            open={this.state.open}
            jsonData={this.state.data}
          />
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    )
  }
}

export default App;
