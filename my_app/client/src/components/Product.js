import React, { Component } from 'react';
import Navigation from './Navigation.js'
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
    };
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
      console.log('obj:'+obj.Descricao);
    })
      .then(product => this.setState({ product }));

    var base='http://localhost:2018/WebApi/Base/ArtigosPrecos/Edita/';
    var priceURL = base+this.state.productID+'/EUR/UN';
    var price;
    console.log(priceURL);
    fetch(priceURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
    }).then(response => response.json())
    .then(function(data){
      price = JSON.parse(JSON.stringify(data));
      price = price.PVP1;
      console.log("pvp1:"+price);
    })
    .then( () => {
        this.setState({ productPrice: price })
      })
  }


  render() {
    return (
      <div>
        <Navigation />
        <div className="container mt-5" >
          <div className="row">
            <div className="col-lg-4">
              <img className="img-fluid" src={'img/' + this.state.productID + '.png'} alt="img"></img>
            </div>
            <div className="col-lg-8">
              <div className="container">
                <h3>{this.state.productID}</h3>
                <p className="product-description">
                  Description: It is a long established fact that a reader will be distracted by the
                  readable content of a page when looking at its layout. The point of using
                  Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opp
                  osed to using 'Content here, content here', making it look like readable English. Many des
                </p>
              </div>
              <div className="product price">
                <h4>Preço:</h4>
                <h4>{this.state.productPrice} € <small className="text-muted">/kg</small></h4>
              </div>
              <div className="form-container">
                <form className="form-horizontal">
                  <div className="form-group">
                    <div className="row">
                      <label className="control-label col-lg-3">Quantidade em kg:</label>
                      <div className="col-lg-2">
                        <input type="number" min="0.5" max="10" step="0.5" className="form-control" id="quantity" placeholder="Kg"
                          name="quantity"></input>
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