import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
    
  } 


  

  componentDidMount() {
    
    fetch('http://localhost:2018/WebApi/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: 'FEUP',
        password: 'qualquer1',
        company: 'DEMO',
        instance: 'DEFAULT',
        grant_type: 'qualquer1'
      })
    })
/**
    fetch('http://localhost:2018/WebApi/token')
      .then(response => response.json())
      .then(data => this.setState({ data }));
      console.log(this.state);*/

    fetch('http://localhost:2018/WebApi/Base/Artigos/Existe/A0001')
      .then(response => response.json())
      .then(data => this.setState({ data }));
      console.log(this.state);

  }

  render() {
    const { hits } = this.state;
    console.log(this.state);
    console.log(hits);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
