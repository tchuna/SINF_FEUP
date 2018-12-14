import React, { Component } from 'react';
import Navigation from './Navigation.js'

class Product extends Component {
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
        <div className="container mt-5" >
          <div className="row">
            <div className="col-lg-4">
              <img className="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="img"></img>
            </div>
            <div className="col-lg-8">
              <div className="container">
                <h3>Product Name</h3>
                <p className="product-description">
                  Description: It is a long established fact that a reader will be distracted by the
                  readable content of a page when looking at its layout. The point of using
                  Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opp
                  osed to using 'Content here, content here', making it look like readable English. Many des
                </p>
              </div>
              <div class="product price">
                <h4>Preço:</h4>
                <h4>2 € <small className="text-muted">/kg</small></h4>
              </div>
              <div class="form-container">
                <form className="form-horizontal" action="">

                  <div className="form-group">
                    <div className="row">
                      <label className="control-label col-lg-3" for="email">Quantidade em kg:</label>
                      <div className="col-lg-2">
                        <input type="number" min="0.5" max="10" step="0.5" class="form-control" id="quantity" placeholder="Kg"
                          name="quantity"></input>
                      </div>
                      <div class="col-lg-4">
                        <button type="submit" className="btn btn-primary"> <i class="fas fa-shopping-cart"></i> Comprar </button>
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