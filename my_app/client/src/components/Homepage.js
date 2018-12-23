import React, { Component } from 'react';
import { Navigation, Footer } from './Navigation.js';
import qs from 'qs';
import {Redirect} from 'react-router-dom';

class HomepageSuggestionsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      suggestedData: null,
      newestProducts: null,
      suggestedProducts: null
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    // Fetch Products
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
        instance: 'DEFAULT',
        grant_type: 'password',
        line: 'professional'
      })
    }).then(response => response.json())
      .then(function(data) {
        obj =JSON.parse(JSON.stringify(data));
      })
      .then(() => {
        this.getProductsNew(obj.access_token);
      })
      .then(() => {
        this.getProductsSuggestions(obj.access_token);
      });
}

getProductsNew(token){
  let query = JSON.stringify("Select Artigo, Descricao, DataUltimaActualizacao from Artigo");
  fetch('http://localhost:2018/WebApi/Administrador/Consulta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      'Authorization': 'Bearer '+token
    },
    body: query,
  }).then(response => response.json())
  .then(data => this.setState({ data }))
  .then(() => {
    this.getNewestProducts();
  });
}

getProductsSuggestions(token){
  let query = JSON.stringify("Select Artigo from LinhasDoc Group By Artigo Order By Count(*) Desc");
  fetch('http://localhost:2018/WebApi/Administrador/Consulta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      'Authorization': 'Bearer '+token
    },
    body: query,
  }).then(response => response.json())
    .then(suggestedData => this.setState({ suggestedData }))
    .then(() => {
      this.getSuggestionsProducts();
    });
}

  getNewestProducts() {
    var newestProducts = [];

    if (this.state.data) {
      let obj =JSON.parse(JSON.stringify(this.state.data));
      if(obj.DataSet.Table){
      let products = obj.DataSet.Table;
      products.sort(function(a, b) {
        a = new Date(a.DataUltimaActualizacao);
        b = new Date(b.DataUltimaActualizacao);
      return a>b ? -1 : a<b ? 1 : 0;
    });
    newestProducts = products.slice(0,6);
      }
    }
    this.setState({newestProducts: newestProducts});
  }

  getSuggestionsProducts() {
    var suggestedProducts = [];

    if (this.state.suggestedData) {
      let obj =JSON.parse(JSON.stringify(this.state.suggestedData));
      let products = obj.DataSet.Table;
        suggestedProducts = products.slice(0,6);
    }
    this.setState({suggestedProducts: suggestedProducts});
  }

  render() {
    var newProducts;
    var suggestedProducts;

    if(this.state.suggestedProducts != null){
      //console.log(this.state.suggestedProducts);
       suggestedProducts = this.state.suggestedProducts.map(product =>{
        return (
          <div key={product.Artigo} className="col-lg-2">
            <a href={"products/" + product.Artigo}>
              <img className="img-fluid" width="200" height="160" src={"img/" + product.Artigo + ".png"} alt="Product" />
            </a>
          </div>
        )
      })
    }

    if(this.state.newestProducts != null){
       newProducts = this.state.newestProducts.map(product =>{
        return (
          <div key={product.Artigo} className="col-lg-2">
            <a href={"products/" + product.Artigo}>
              <img className="img-fluid"  width="200" height="160" src={"img/" + product.Artigo + ".png"} alt="Product" />
            </a>
          </div>
        )
      })
    }

    return (
    <div>
      <div className="mb-3">
        <h4>Sugestões</h4>
        <hr/>
        <div className="row">
          {suggestedProducts}
        </div>
      </div>
      <div className="mb-3">
        <h4>Novidades</h4>
        <hr/>
        <div className="row">
          {newProducts}
        </div>
      </div>
    </div>
      )
    }
}

class HomepageCategory extends Component {
  render() {
    return (
      <div className="mb-3">
        <div className="row">
          <div className="col-lg-6">
            <h4>Fruta</h4>
            <a href="/category/FRT">
              <img className="img-fluid" src="/img/fruta.jpg" alt="Fruta" />
            </a>
          </div>
          <div className="col-lg-6">
            <h4>Legumes</h4>
            <a href="/category/LGM">
              <img className="img-fluid" src="/img/legumes.jpg" alt="Legumes" />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentWillMount() {
    if(sessionStorage.getItem('token')){
      //console.log("ja existe token");
    }
    else{
      this.setState({redirect: true});
    }
  }

  render() {

    if(this.state.redirect){
      return (<Redirect to={'/login'}/>)
    }

    return (
      <div>
        <Navigation />
        <div className="container main-container mt-5 mb-3">
          <HomepageCategory />
          <HomepageSuggestionsNew />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Homepage;
