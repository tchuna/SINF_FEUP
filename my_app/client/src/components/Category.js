import React, { Component } from 'react';
import Navigation from './Navigation.js';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      redirect: false,
      category: props.match.params.category,
      products: null,
    };
  }

  componentWillMount() {
    if (sessionStorage.getItem('token')) {
      console.log("ja existe token");
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
        obj = JSON.parse(JSON.stringify(data))
      })
      .then(() => {
        this.getProducts(obj.access_token);
      });

    //console.log(this.state.category);

  }

  getProducts(token) {

    //const query = `SELECT CD.Data, CD.TipoDoc, CD.Documento, CD.NumDoc, CD.TotalDocumento, CD.Nome,
    //CDS.Estado FROM CabecDoc CD INNER JOIN CabecDocStatus CDS ON CDS.IdCabecDoc = CD.Id WHERE CD.TipoDoc='FA'`;
    var query;

    if (this.state.category === 'FRT')
      query = JSON.stringify("Select Artigo,Descricao from Artigo where Artigo.Familia = 'FRT'");
    else
      query = JSON.stringify("Select Artigo,Descricao from Artigo where Artigo.Familia = 'LGM'");
    var obj;
    fetch('http://localhost:2018/WebApi/Administrador/Consulta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: query,
    }).then(response => response.json())
      .then(function (data) {
        obj = JSON.parse(JSON.stringify(data));
        console.log(obj.DataSet.Table);
        obj = obj.DataSet.Table;
      })
      .then(() => {
        this.setState({ products: obj })
      });




  }


  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/login'} />)
    }
    var category;
    if (this.state.category === 'FRT')
      category = 'Frutas';
    else
      category = 'Legumes';
    return (
      <div>
        <Navigation />
        <div className="container mt-5">
          <h3>{category}</h3>
          <hr />
          <div className="row">
            {(this.state.products || []).map(function (prod) {
              return <Product key={prod.Artigo} id={prod.Artigo} Descricao={prod.Descricao} />
            })}
          </div>

        </div>
      </div>
    );
  }
}
//<img className="img-fluid" src={'../img/' + this.state.productID + '.png'} alt="img"></img>


class Product extends Component {
  constructor(props) {
    super(props);
    console.log(props);

  }

  render() {
    let link= '../products/'+this.props.id;
    return (
      <div className="col-lg-4">
        <a href={link}>
        <div className="card text-center">
          <img className="img-fluid mb-3" src={'../img/' + this.props.id + '.png'} alt="img" />
            <h5>{this.props.Descricao}</h5>
            <p>Price:</p>
        </div>
        </a>
      </div>
    )
  }
}

export default Category;
