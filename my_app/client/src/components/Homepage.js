import React, { Component } from 'react';
import Navigation from './Navigation.js';

class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      data: null,
    };
 
  }
 
  componentDidMount () {
    this.getData();
  }

  getData () {
      // Fetch Products
  }
 
  render() {
 
    return (
      <div>
        <Navigation />
        
        <div className="container">
      <h2>TBD</h2>
        
      </div>
      </div>

    
      
    );
  }
}
 
export default App;