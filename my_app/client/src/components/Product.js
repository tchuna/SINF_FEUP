import React, { Component } from 'react';
import qs from 'qs';
import Navigation from './components/Navigation.js'

 
 
class Product extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      data: null,
    };
 
  }
 
 
  render() {
 
    return (
      <div className="Product">
        <Navigation/>

       
        
      </div>
    );
  }
}
 
export default Product;