import React, { Component } from 'react';
import Navigation from './Navigation.js'
import {Redirect} from 'react-router-dom';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      redirect: false
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
    var list;
    var totalPrice = 0;
    if(sessionStorage.getItem('cart')){
       list = (JSON.parse(sessionStorage.getItem('cart'))).map( product =>{
        let subTotal = Math.round(product.price * product.quantity * 100) / 100 ;
        totalPrice += subTotal;
        return (
          <tr>
            <td data-th="Product"> <img src={"img/" + product.id + ".png"} alt="..."  width="80" height="80" className="img-responsive" /></td>
            <td> <p>{product.description}</p> </td>
            <td data-th="Price" className="text-center">{product.price} €</td>
            <td data-th="Quantity" className="text-center">{product.quantity} Kg</td>
            <td data-th="Subtotal" className="text-center">{subTotal} €</td>
            <td className="actions" data-th="">
              <button className="btn btn-danger btn-sm"><i className="fa fa-times-circle"></i></button>
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
              <td><button className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></button></td>
            </tr>
          </tfoot>
          </table>
        </div>
    );
  }
}

export default Cart;
