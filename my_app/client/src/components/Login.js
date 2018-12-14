import React, { Component } from 'react';
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
        <div className="container mt-5">
          <div className="row">
            <div className="mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Sign In</h5>
                  <form className="form-signin">

                    <div className="form-label-group mb-3">
                      <label for="inputUsername">Username</label>
                      <input type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus></input>
                    </div>

                    <div className="form-label-group mb-3">
                      <label for="inputPassword">Password</label>
                      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required></input>
                    </div>

                    <button className="btn btn-primary btn-block text-uppercase" type="submit">Sign in</button>

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