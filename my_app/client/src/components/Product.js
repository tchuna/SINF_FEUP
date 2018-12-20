import React, { Component } from 'react';
import Navigation from './Navigation.js';
import {Redirect} from 'react-router-dom';
import qs from 'qs';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      productID: props.match.params.id,
      product: null,
      productPrice: null,
      productDescription: null,
      productName: null,
      productQuantity: 0,
      redirect: false,
      stock: null,
    };

    this.addToCart = this.addToCart.bind(this);
    this.changeProductWeight = this.changeProductWeight.bind(this);
  }
  componentDidMount() {

    this.getToken();
  }


  componentWillMount() {
    if(sessionStorage.getItem('token')){
      console.log("ja existe token");
    }
    else{
      this.setState({redirect: true});
    }
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
        //this.validateUser(obj.access_token);
        this.productExists(obj.access_token);

      });
  }

  productExists(token){
    var baseExists ='http://localhost:2018/WebApi/Base/Artigos/Existe/'
    var existsURL = baseExists+this.state.productID;
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
        this.getProduct(token);
      }
      else{
        console.log("artigo nao existe");
      }
    });

  }

  getProduct(token) {

    var baseURL = 'http://localhost:2018/WebApi/Base/Artigos/Edita/';
    var newURL = baseURL + this.state.productID;
    var obj;
    var stock;
    var desc;
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
      obj = JSON.parse(JSON.stringify(data));
      stock= obj.StkActual;
      desc=obj.Observacoes;
      //console.log("description:"+desc);
      obj=obj.Descricao;
      console.log('prod:'+stock);

    })
      .then(product => this.setState({ product }))
      .then(() => {
        this.getProductPrice(token);
        this.setState({ productName: obj })
        this.setState({ productDescription: desc })
        this.setState({ stock: stock })

      });


      //Base/Artigos/DaValorAtributo/MCA/Descricao
  }

  getProductPrice(token){
    var base='http://localhost:2018/WebApi/Base/ArtigosPrecos/Edita/';
    var priceURL = base+this.state.productID+'/EUR/UN';
    var price;
    console.log(priceURL);
    fetch(priceURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    }).then(response => response.json())
    .then(function(data){
      price = JSON.parse(JSON.stringify(data));
      price = price.PVP1;
      console.log("pvp1:"+price);
    })
    .then( () => {
        this.setState({ productPrice: price })
      });
  }

  addToCart(event) {
    let productJSON = this.createProductJSON();

    if(sessionStorage.getItem('cart')){
      let cart = JSON.parse(sessionStorage.getItem('cart'));
      console.log(cart);
      cart.push(productJSON);
      console.log(cart);
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    else{
      let cart = [];
      cart.push(productJSON);
      console.log(cart);
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    event.preventDefault();
  }

  createProductJSON() {
      let productJSON = {};
      productJSON.id = this.state.productID;
      productJSON.name = this.state.productName;
      productJSON.description = this.state.productDescription;
      productJSON.price = this.state.productPrice;
      productJSON.quantity = this.state.productQuantity;

      return productJSON;
  }

  changeProductWeight(event){
     this.setState({productQuantity: event.target.value});
  }

  render() {

    if(this.state.redirect){
      return (<Redirect to={'/login'}/>)
    }
    return (
      <div>
        <Navigation />
        <div className="container mt-5" >
          <div className="row">
            <div className="col-lg-4">
              <img className="img-fluid" src={'../img/' + this.state.productID + '.png'} alt="img"></img>
            </div>
            <div className="col-lg-8">
              <div className="container">
                <h3>{this.state.productName}</h3>
                <p className="product-description">
                {this.state.productDescription}
                </p>
                <div className="product stock">
                <h4>Em stock:</h4>
                <h4>{this.state.stock} <small className="text-muted">kg</small></h4>
              </div>
              <div className="product price">
                <h4>Preço:</h4>
                <h4>{this.state.productPrice} € <small className="text-muted">/kg</small></h4>
              </div>
            </div>
              <div className="form-container">
                <form className="form-horizontal" onSubmit={this.addToCart}>
                  <div className="form-group">
                    <div className="row">
                      <label className="control-label col-lg-3">Quantidade em kg:</label>
                      <div className="col-lg-2">
                        <input type="number" min="0.5" max="10" step="0.5" className="form-control" id="quantity" placeholder="Kg"
                          name="quantity" value={this.state.productWeight} onChange={this.changeProductWeight}></input>
                      </div>
                      <div className="col-lg-4">
                        <button type="submit" className="btn btn-primary"> Comprar </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
