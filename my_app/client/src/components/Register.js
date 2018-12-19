import React, { Component } from 'react';
import Navigation from './Navigation.js'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: "NUNOA",
      nome: "Soluciones Cad de qwerty",
      descricao: "qwerty1234",
      morada: "PASSEO DE PORTUGAL, 12345",
      localidade: "VILANUEVA DE ARRIBA",
      codigoPostal: "61001",
      localidadeCodigoPostal: "MADRID",
      telefone: "00.034.1.474747447",
      fax: "00.034.1.4374747474",
      enderecoWeb: "http://alcad.es",
      distrito: "",
      numContribuinte: "989922456",
      pais: "ES",
      moeda: "EUR"
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
                  <h5 className="card-title text-center">Sign Up</h5>
                  <form className="form-signup">

                    <div className="form-label-group mb-3">
                      <label for="company">Company?</label>
                      <input type="text" id="company" class="form-control" placeholder="company" required autofocus></input>
                    </div>

                    <div className="form-label-group mb-3">
                      <label for="name">Client Name</label>
                      <input type="text" id="name" class="form-control" placeholder="name" required autofocus></input>
                    </div>

                    <div className="form-label-group mb-3">
                      <label for="inputUsername">Username</label>
                      <input type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus></input>
                    </div>

                    <div className="form-label-group mb-3">
                      <label for="inputPassword">Password</label>
                      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required></input>
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