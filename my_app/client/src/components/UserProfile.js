import React, { Component } from 'react';
import Navigation from './Navigation.js';
import {Redirect} from 'react-router-dom';
import qs from 'qs';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      userID: props.match.params.id,
      redirect: false,
      name: null,
      nif: null,
      address: null,
      phone: null,

    };
  }

  componentWillMount() {
    if(sessionStorage.getItem('token')){
      console.log("ja existe token");
    }
    else{
      this.setState({redirect: true});
    }
  }
  componentDidMount() {
    this.getToken();
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
        this.userExists(obj.access_token);

      });
  }

  userExists(token){

    var baseExists ='http://localhost:2018/WebApi/Base/Clientes/Existe/'
    var existsURL = baseExists+this.state.userID;
    console.log(existsURL);
    var obj;
    fetch(existsURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
    }).then(response => response.json())
    .then(function(data){
      obj = JSON.parse(JSON.stringify(data));
      console.log(obj);
    })
    .then(() => {
      if(obj===true){
        this.getClient(token);
        console.log("cliente existe");
      }
      else{
        console.log("artigo nao existe");
      }
    });
  }
  getClient(token) {

    var nome;
    var nif;
    var morada;
    var telefone;

    var baseURL = 'http://localhost:2018/WebApi/Base/Clientes/Edita/';
    var newURL = baseURL + this.state.userID;
    console.log(newURL);
    fetch(newURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
        'Authorization': 'Bearer ' + token
      },
    }).then(response => response.json())
    .then(function(data){
      console.log(data);
      nome = data.Nome;
      morada = data.Morada + ',' +data.Localidade;
      telefone= data.Telefone;
      nif = data.NumContribuinte;
      console.log(telefone);
    })
    .then(() => {
      this.setState({ name: nome })
      this.setState({ phone: telefone })
      this.setState({ address: morada })
      this.setState({ nif: nif })
    });
      
  }
  render() {
    if(this.state.redirect){
      return (<Redirect to={'/login'}/>)
    }
    return (
      <div>
        <Navigation />
          <div className="container main-container mt-5">
            <div className="row">
              <div className="col-lg-12">
                <h3>{this.state.userID}</h3>
              </div>
              <div className="col-lg-3 text-center">
                <img className="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                <br /><br />
                <a href="/" className="btn btn-primary float-center"><i className="fas fa-edit"></i> Edit profile</a>
              </div>

              <div className="col-lg-9">
                <p className="user-bio">
                <strong>Nome: </strong> {this.state.name}
                </p>
                <p className="user-bio">
                <strong>NIF: </strong>{this.state.nif}
               
                </p>
                <p className="user-bio">
                <strong>Telefone: </strong> {this.state.phone}
                </p>
                <p className="user-bio">
                <strong>Morada:</strong> {this.state.address}
                </p>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-12">
                <h3>Shopping historic</h3>
              </div>
              <div className="col-lg-8 offset-2">
                <ul className="list-group">
                  <li className="list-group-item"><a href="/">Order 1</a></li>
                  <li className="list-group-item"><a href="/">Order 2</a></li>
                  <li className="list-group-item"><a href="/">Order 3</a></li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h3>Current orders</h3>
              </div>
              <div className="col-lg-8 offset-2" >
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/">Order A </a>
                    <span className="badge badge-success badge-pill">Complete</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/">Order B </a>
                    <span className="badge badge-secondary badge-pill">Ongoing</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/">Order C</a>
                    <span className="badge badge-danger badge-pill">Cancelled</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/">Order D</a>
                    <span className="badge badge-warning badge-pill">Pending</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12 text-center">
                <a href="/" className="btn btn-secondary float-center"><i className="fas fa-arrow-circle-left "></i> Retroceed</a>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
