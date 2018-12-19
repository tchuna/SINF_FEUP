import React, { Component } from 'react';
import Navigation from './Navigation.js'
import {Redirect} from 'react-router-dom';

import qs from 'qs';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      cart: null,
      cartToSend: null,
      data: null,
      redirect: false,
      cartDone: false,
    };
      this.removeRow = this.removeRow.bind(this);
      this.createDocument = this.createDocument.bind(this);
      this.sendECL = this.sendECL.bind(this);
  }

  componentDidMount() {
    var arrayCartToSend = [];
    if(sessionStorage.getItem('cart')){
    var array = JSON.parse(sessionStorage.getItem('cart'));

    var userID = sessionStorage.getItem('userID');

    var arrayLength = array.length;
    if(arrayLength > 0){
      for (var i = 0; i < arrayLength; i++) {
        let productJSON = {};
        productJSON.Artigo = array[i].id;
        productJSON.Quantidade = array[i].quantity;
        arrayCartToSend.push(productJSON);
        }
      }
      this.setState({ cart: array});
    }
    console.log(arrayCartToSend);
    this.setState({ cartToSend: arrayCartToSend});
    this.setState({ userID: userID});
  }

  componentWillMount() {
    if(sessionStorage.getItem('token')){
      console.log("ja existe token");
    }
    else{
      this.setState({redirect: true});
    }
  }

  createDocument() {
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
        this.sendECL(obj.access_token);
      });
      alert("Order completed");
      sessionStorage.setItem('cart','');
      this.setState({ cartDone: true});
  }

  sendECL(token){
      var url ='http://localhost:2018/WebApi/Vendas/Docs/CreateDocument/';
      var obj;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          Linhas: this.state.cartToSend,
          Tipodoc: 'ECL',
          Serie: 'A',
          Entidade: this.state.userID,
          TipoEntidade: 'C',
          DataDoc: '12/11/2018',
          DataVenc: '12/12/2018'
        })
      }).then(response => response.json())
      .then(function(data){
        obj = JSON.parse(JSON.stringify(data));
      });
    }

  removeRow = (event,product) => {
    var array = JSON.parse(sessionStorage.getItem('cart'));
    var arrayCartToSend = this.state.cartToSend;
    var index = array.indexOf(product);
    array.splice(index, 1);
    arrayCartToSend.splice(index,1);
    sessionStorage.setItem('cart', JSON.stringify(array));
    this.setState({ cart: array});
    this.setState({ cartToSend: arrayCartToSend});
  }

  render() {
    if(this.state.redirect){
      return (<Redirect to={'/login'}/>)
    }

    if(this.state.cartDone){
      return (<Redirect to={'/homepage'}/>)
    }

    var list;
    var totalPrice = 0;
    if(this.state.cart != null){
       list = this.state.cart.map( product =>{
        let subTotal = Math.round(product.price * product.quantity * 100) / 100 ;
        totalPrice += subTotal;

        return (
          <tr>
            <td data-th="Product"> <img src={"img/" + product.id + ".png"} alt="..."  width="80" height="80" className="img-responsive" /></td>
            <td> <p>{product.name}</p> </td>
            <td data-th="Price"  className="text-center">{product.price} €</td>
            <td data-th="Quantity" className="text-center">{product.quantity} Kg</td>
            <td data-th="Subtotal" className="text-center">{subTotal} €</td>
            <td className="actions" data-th="">
              <button className="btn btn-danger btn-sm" onClick={(event) => this.removeRow(event, product)}><i className="fa fa-times-circle"></i></button>
            </td>
          </tr>
        )
      })
    }

    return (
      <div>
        <Navigation />
          <table id="cart" className="table table-hover table-condensed container mt-5">
          <thead>
            <tr>
              <th>Product</th>
              <th></th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Subtotal</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
          <tfoot>
            <tr>
              <td> <a className="nav-link" href="/homepage">Continue Shopping<span className="sr-only"></span></a> </td>
              <td colSpan="2" className="hidden-xs"></td>
              <td className="hidden-xs text-center"><strong>Total {totalPrice} €</strong></td>
              <td><button onClick={this.createDocument} className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></button></td>
            </tr>
          </tfoot>
          </table>
        </div>
    );
  }
}

export default Cart;
