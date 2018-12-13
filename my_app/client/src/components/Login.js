import React, { Component } from 'react';
import qs from 'qs';
import Navigation from './Navigation.js'

 
 
class Login extends Component {
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
        <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Sign In</h5>
            <form className="form-signin">
              <div className="form-label-group">
              <label for="inputUsername">Username</label>
                <input type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus></input>
              </div>

              <div className="form-label-group">
              <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required></input>
              </div>
             <div className="container">
             <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>

             </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

        

      </div>
    );
  }
}
 
export default Login;