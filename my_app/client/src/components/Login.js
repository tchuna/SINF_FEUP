import React, { Component } from 'react';
import Navigation from './Navigation.js'

import qs from 'qs';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      username: "",
      password: "",
      error: '',
      fetchPassword: '',
      exists: false,

    };
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  
  getToken() {
    var obj;
    fetch('http://localhost:2018/WebApi/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: qs.stringify({
        username: 'FEUP',
        password: 'qualquer1',
        company: 'FRUITSHOP',
        instance: 'Default',
        grant_type: 'password',
        Line: 'professional'
      })
    }).then(response => response.json())
      .then(function(data){
        obj = JSON.parse(JSON.stringify(data));
      })
      .then(() => {
        this.validateUser(obj.access_token);
      });
      console.log(this.state);
      console.log(obj);
  }
  
  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
    //this.validateUser();
    this.getToken();
    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  validateUser(token){
    var baseURL= 'http://localhost:2018/WebApi/Base/Clientes/Existe/';
    var newURL= baseURL+this.state.username;
    console.log(newURL);
    fetch(newURL,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
        'Authorization': 'Bearer '+token
      },
    }).then(response => response.json())
     .then( exists => this.setState({exists}));
     
 
    console.log("EXISTE?="+this.state.exists)
    console.log(this.state);
      if(this.state.exists===true){
        console.log("user existe");
        this.validatePassword(token);
      }
      else if( this.state.exists===false){
        console.log('user:'+ this.state.username+ " nao existe");
        this.setState({ error: 'User nao existe' })
      }
  }


  validatePassword(token){
    //Base/Clientes/DaValorAtributo/C001/CDU_CampoVar2
    var baseURL= 'Base/Clientes/DaValorAtributo/';
    var newURL= baseURL+this.state.username+'/CDU_CampoVar2';
    console.log(newURL);
   
    fetch(newURL,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
        'Authorization': 'Bearer '+token
      },
    }).then(response => response.json())
      .then(fetchPassword => this.setState({ fetchPassword }));

      if(this.state.fetchPassword===this.state.password){
        console.log("login successful");
        //store.set('loggedIn', true);
        //history.push('/users');
      }

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
                  <form className="form-signin" onSubmit={this.handleSubmit}>
                    {

                      this.state.error &&
                      <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <button type="button" className="close" onClick={this.dismissError} data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <strong> {this.state.error}</strong>
                      </div>
                      
                     
                    }
                    <div className="form-label-group mb-3">
                      <label>Username: </label>
                      <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
                    </div>
                    <div className="form-label-group mb-3">
                      <label>Password: </label>
                      <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
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