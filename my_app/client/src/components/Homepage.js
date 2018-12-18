import React, { Component } from 'react';
import { Navigation, Footer } from './Navigation.js';
import qs from 'qs';
import {Redirect} from 'react-router-dom';

class HomepageSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    // Fetch Products
    /*
    var obj;
    fetch('http://localhost:2018/WebApi/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: qs.stringify({
        username: 'FEUP',
        password: 'qualquer1',
        company: 'FRUITS',
        instance: 'DEFAULT',
        grant_type: 'password',
        line: 'professional'
      })
    }).then(response => response.json())
      .then(function(data) {
        console.log(JSON.parse(JSON.stringify(data)));
      });
      .then(() => {
        this.getProducts(obj.access_token);
      });*/
  }

  getProducts(token){
    fetch('http://localhost:2018/WebApi/Base/Artigos/Edita/APV', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
        'Authorization': 'Bearer '+token
      },
    }).then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    //console.log(this.state);
    var obj;
    var a;
    if(this.state.data){
      obj =JSON.parse(JSON.stringify(this.state.data));
      console.log(obj.Descricao);
      a = obj.Descricao;
    }
    var cenas ="cenas";
    return (
      <div className="mb-3">
        <h4>Sugestões</h4>
        <hr />
        <div className="row">

          <div className="col-lg-2">
            <img className="img-fluid mb-2" src="/img/img-placeholder.png" alt="Product" />
            <h6>Name: {a}</h6>
            <h6>Price:</h6>
          </div>
          <div className="col-lg-2">
            <img className="img-fluid mb-2" src="/img/img-placeholder.png" alt="Product" />
            <h6>Name:</h6>
            <h6>Price:</h6>
          </div>

        </div>
      </div>
    );
  }
}

class HomepageNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
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
        company: 'FRUITS',
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
      });
}

getProductsNew(token){
  fetch('http://localhost:2018/WebApi/Base/Artigos/LstArtigos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
      'Authorization': 'Bearer '+token
    },
  }).then(response => response.json())
    .then(data => this.setState({ data }));
}

  render() {

    //Selecting 6 of the most recents elements
    var newProductsName = [];
    if(this.state.data){
      let obj =JSON.parse(JSON.stringify(this.state.data));
      let products = obj.DataSet.Table;
      let newProducts = products.slice(products.length-6, products.length);
      let i;
      for(i=0; i<newProducts.length;i++){
        newProductsName[i] = newProducts[i].Artigo;
      }
    }

    return (
      <div className="mb-3">
        <h4>Novidades</h4>
        <hr />
        <div className="row">
          <div className="col-lg-2">
            <img className="img-fluid" src={"img/" + newProductsName[5] + ".png"} alt="Product" />
          </div>
          <div className="col-lg-2">
            <img className="img-fluid" src={"img/" + newProductsName[4] + ".png"} alt="Product" />
          </div>
          <div className="col-lg-2">
            <img className="img-fluid" src={"img/" + newProductsName[3] + ".png"} alt="Product" />
          </div>
          <div className="col-lg-2">
            <img className="img-fluid" src={"img/" + newProductsName[2] + ".png"} alt="Product" />
          </div>
          <div className="col-lg-2">
            <img className="img-fluid" src={"img/" + newProductsName[1] + ".png"} alt="Product" />
          </div>
          <div className="col-lg-2">
            <img className="img-fluid" src={"img/" + newProductsName[0] + ".png"} alt="Product" />
          </div>
        </div>
      </div>
    );
  }
}

class HomepageCategory extends Component {
  render() {
    return (
      <div className="mb-3">
        <div className="row">
          <div className="col-lg-6">
            <h4>Fruta</h4>
            <a href="/category/fruta">
              <img className="img-fluid" src="/img/fruta.jpg" alt="Fruta" />
            </a>
          </div>
          <div className="col-lg-6">
            <h4>Legumes</h4>
            <a href="/category/legumes">
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
      console.log("ja existe token");
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
          <HomepageSuggestions />
          <HomepageNew />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Homepage;
