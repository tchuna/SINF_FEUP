import React, { Component } from 'react';
import Navigation from './Navigation.js'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  render() {
    return (
      <div>
        <Navigation />
        <div class="container mt-5">
          <table id="cart" className="table table-hover table-condensed"></table>
          <thead>
            <tr>
              <th>Product</th>
              <th >Price</th>
              <th>Quantity</th>
              <th className="text-center">Subtotal</th>
              <th ></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-th="Product">
                <div class="row">
                  <div className="col-sm-2 hidden-xs"><img src="http://placehold.it/80x80" alt="..." className="img-responsive" /></div>
                  <div className="col-sm-10">
                    <h4 className="nomargin">Product 1</h4>
                    <p>Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </td>
              <td data-th="Price">1.99€</td>
              <td data-th="Quantity">
                <input type="number" className="form-control text-center" value="1"></input>
              </td>
              <td data-th="Subtotal" className="text-center">1.99</td>
              <td className="actions" data-th="">
                <button className="btn btn-danger btn-sm"><i class="fa fa-times-circle"></i></button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td><button className="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</button></td>
              <td colspan="2" class="hidden-xs"></td>
              <td className="hidden-xs text-center"><strong>Total 1.99€</strong></td>
              <td><button className="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></button></td>
            </tr>
          </tfoot>
        </div>
      </div>
    );
  }
}

export default Cart;