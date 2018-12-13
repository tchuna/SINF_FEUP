import React, { Component } from 'react';
import qs from 'qs';
import Navigation from './Navigation.js'

 
 
class Search extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      data: null,
    };
 
  }
 
 
  render() {
    return (
      <div>
        <Navigation />

            <h4>TBD</h4>

      </div>
    );
  }
}
 
export default Search;