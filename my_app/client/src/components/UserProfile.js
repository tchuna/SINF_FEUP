import React, { Component } from 'react';
import Navigation from './Navigation.js';
import { Redirect } from 'react-router-dom';
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
      orders: null,

    };
  }

  componentWillMount() {
    if (sessionStorage.getItem('token')) {
      console.log("existe token");
    }
    else {
      this.setState({ redirect: true });
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
      .then(function (data) {
        obj = JSON.parse(JSON.stringify(data));
      })
      .then(() => {
        this.userExists(obj.access_token);

      });
  }

  userExists(token) {

    var baseExists = 'http://localhost:2018/WebApi/Base/Clientes/Existe/'
    var existsURL = baseExists + this.state.userID;
    console.log(existsURL);
    var obj;
    fetch(existsURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
    }).then(response => response.json())
      .then(function (data) {
        obj = JSON.parse(JSON.stringify(data));
        console.log(obj);
      })
      .then(() => {
        if (obj === true) {
          this.getClient(token);
          console.log("cliente existe");
        }
        else {
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
      .then(function (data) {
        //console.log(data);
        nome = data.Nome;
        morada = data.Morada + ',' + data.Localidade;
        telefone = data.Telefone;
        nif = data.NumContribuinte;
        //console.log(telefone);
      })
      .then(() => {
        this.setState({ name: nome })
        this.setState({ phone: telefone })
        this.setState({ address: morada })
        this.setState({ nif: nif })
        this.getClientOrders(token);
      });

  }


  getClientOrders(token) {

    let entity = sessionStorage.getItem('userID');
    entity = "\'" + entity + "\'";
    const query = "SELECT CD.Data, CD.TipoDoc, CD.Documento, CD.NumDoc, CD.TotalDocumento, CD.Nome, CD.Entidade,CDS.Estado FROM CabecDoc CD INNER JOIN CabecDocStatus CDS ON CDS.IdCabecDoc = CD.Id WHERE CD.TipoDoc='ECL' and CD.Entidade =";
    entity = query + entity;
    var url = JSON.stringify(entity);
    //console.log(url)
    /**
     "SELECT CD.Data, CD.TipoDoc, CD.Documento, CD.NumDoc, CD.TotalDocumento, CD.Nome, CD.Entidade,
    CDS.Estado FROM CabecDoc CD INNER JOIN CabecDocStatus CDS ON CDS.IdCabecDoc = CD.Id WHERE CD.TipoDoc='ECL' and CD.Entidade = 'C0001'"
     */
    var obj;
    fetch('http://localhost:2018/WebApi/Administrador/Consulta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: url,
    }).then(response => response.json())
      .then(function (data) {
        obj = JSON.parse(JSON.stringify(data));
        obj = obj.DataSet.Table;
        console.log(obj);

      })
      .then(() => {
        this.setState({ orders: obj })
      });

  }
  // <th class="scope">{s.Data}</th>
  orderItems = () => {
    if (this.state.orders != null) {
      return this.state.orders.map(s => {
        return <tr>
          <th scope="row">{s.NumDoc}</th>
          <td>{s.Data}</td>
          <td>{s.TotalDocumento}</td>
          <td>{s.Estado}</td>
        </tr>
      })
    }
  }


  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/login'} />)
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
              <img className="img-fluid" src="https://img.icons8.com/ios/1600/user-male-circle-filled.png" alt="Chania"></img>
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
          <br/>
          <br/>

          <div className="row">
            <div className="col-lg-12">
              <h3>Shopping History</h3>
            </div>
            <br/>
          <br/>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">NumDocumento</th>
                  <th scope="col">Data</th>
                  <th scope="col">TotalDocumento</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                  {this.orderItems()}
              </tbody>
            </table>
          </div>
          <br/>
          <br/>
        </div>
      </div>
    );
  }
}

export default UserProfile;
