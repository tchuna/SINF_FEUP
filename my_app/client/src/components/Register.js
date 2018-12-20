import React, { Component } from 'react';
import Navigation from './Navigation.js';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: '',
      nome: '',
      numContribuinte: '',
      pais: 'PT',
      moeda: 'EUR',
      redirect: false,
      exists: false,
      error: '',
      password: '',
      token: ''
    };
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleClienteChange = this.handleClienteChange.bind(this);
    this.handleNomeChange = this.handleNomeChange.bind(this);
    this.handleNCChange = this.handleNCChange.bind(this);
    this.handlePaisChange = this.handlePaisChange.bind(this);
    this.handleMoedaChange = this.handleMoedaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    this.getToken();
    return this.setState({ error: '' });
  }

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  handleClienteChange(evt) {
    this.setState({
      cliente: evt.target.value,
    });
  };

  handleNomeChange(evt) {
    this.setState({
      nome: evt.target.value,
    });
  };

  handleNCChange(evt) {
    this.setState({
      numContribuinte: evt.target.value,
    });
  };

  handlePaisChange(evt) {
    this.setState({
      pais: evt.target.value,
    });
  };

  handleMoedaChange(evt) {
    this.setState({
      moeda: evt.target.value,
    });
  };

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
      .then(function (data) {
        obj = JSON.parse(JSON.stringify(data));
      })
      .then(() => {
        this.validateUser(obj.access_token);
      });
  }

  validateUser(token) {
    var baseURL = 'http://localhost:2018/WebApi/Base/Clientes/Existe/';
    var newURL = baseURL + this.state.username;
    fetch(newURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
        'Authorization': 'Bearer ' + token
      },
    }).then(response => response.json())
      .then(exists => this.setState({ exists }))
      .then(() => {
        if (this.state.exists === true) {
          this.setState({ error: 'User ja existe' })
        } else if (this.state.exists === false) {
          this.registerUser(token);
        }
      });
  }

  registerUser(token) {
    var baseURL = 'http://localhost:2018/WebApi/Base/Clientes/Actualiza/';

    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        Cliente: this.state.cliente,
        Nome: this.state.nome,
        NumContribuinte: this.state.numContribuinte,
        Pais: this.state.pais,
        Moeda: this.state.moeda,
        CDU_CampoVar2: this.state.password
      })
    }).then(() => this.setState({ redirect: true }));/*.then(response => response.json())
      .then((response) => {
        console.log(response);
      });*/
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/login'} />)
    }

    if (sessionStorage.getItem('token')) {
      //return (<Redirect to={'/homepage'} />)
    }

    return (
      <div>
        <Navigation />
        <div className="container mt-5">
          <div className="row">
            <div className="mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Sign Up</h5>
                  <form className="form-signup" onSubmit={this.handleSubmit}>
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
                      <label htmlFor="inputCliente">Cliente</label>
                      <input type="text" id="inputCliente" className="form-control" placeholder="Cliente" required autoFocus value={this.state.cliente} onChange={this.handleClienteChange}></input>
                    </div>

                    <div className="form-label-group mb-3">
                      <label htmlFor="inputNome">Nome</label>
                      <input type="text" id="inputNome" className="form-control" placeholder="Nome" required value={this.state.nome} onChange={this.handleNomeChange}></input>
                    </div>

                    <div className="form-label-group mb-3">
                      <label htmlFor="inputNumContribuinte">Numero de Contribuinte</label>
                      <input type="text" id="inputNumContribuinte" className="form-control" placeholder="Numero de Contribuinte" required value={this.state.numcontribuinte} onChange={this.handleNCChange}></input>
                    </div>

                    <div className="form-label-group mb-3">
                      <label htmlFor="inputPais">País</label>
                      <input type="text" id="inputPais" className="form-control" placeholder="País" required value={this.state.pais} onChange={this.handlePaisChange}></input>
                    </div>

                    <div className="form-label-group mb-3">
                      <label htmlFor="inputMoeda">Moeda</label>
                      <input type="text" id="inputMoeda" className="form-control" placeholder="Moeda" required value={this.state.moeda} onChange={this.handleMoedaChange}></input>
                    </div>

                    <div className="form-label-group mb-3">
                      <label htmlFor="inputPassword">Password</label>
                      <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.password} required onChange={this.handlePassChange}></input>
                    </div>

                    <button className="btn btn-primary btn-block text-uppercase" type="submit">Sign up</button>

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

export default Register;