import React, { Component } from 'react';
import qs from 'qs';
import Navigation from './components/Navigation.js'
import User from './components/UserProfile.js'
import UserProfile from './components/UserProfile.js';
 
 
 
class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      data: null,
    };
 
  }

 /** 
  componentDidMount() {
 
    fetch('http://localhost:2018/WebApi/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer Q4rCzFf8Aji11EdnEQEGWEPcfDH34ie7FCQl9eVxx-85uKa2IplxTBJCpomCMhAk-cw4JI5tkoCykL5mckvz_oSGtO5xz255bL_3cKdZmr7wH8e4jVH0mb_OVCta9IYtglfnCb9Npi4b_A8GbNXEL2f9kcikxCyqqQwGaaVOMxiE4vDCOEPTGsmZivdHDKGtu3KW1aRyg2CfpimAMxOsS4IWAEk_FqJHQTvTHuI3Zoc4_WoDnrkVXz-IGUxhRI7da8bv7JwzN537oru_MAj0hYhCoRf1oirtBYE01wWw9WnOVy3EiMgH0s7chFR534-V',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: qs.stringify({
        username: 'FEUP',
        password: 'qualquer1',
        company: 'DEMO',
        instance: 'Default',
        grant_type: 'password',
        Line: 'professional'
      })
    }).then(response => response.json())
      .then(data => this.setState({ data }));
 
    console.log(this.state);
 
  }
  */
 
  render() {
 
    return (
      <div>

        <div className="container">
      <h2>TBD</h2>
        
      </div>
      </div>

    
      
    );
  }
}
 
export default App;