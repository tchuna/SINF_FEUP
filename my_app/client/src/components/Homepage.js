import React, { Component } from 'react';
import { Navigation, Footer } from './Navigation.js';

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
  }

  render() {
    return (
      <div className="mb-3">
        <h4>Sugestões</h4>
        <hr />
        <div className="row">

          <div className="col-lg-2">
            <img className="img-fluid mb-2" src="/img/img-placeholder.png" alt="Product" />
            <h6>Name:</h6>
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
  }

  render() {
    return (
      <div className="mb-3">
        <h4>Novidades</h4>
        <hr />
        <div className="row">
          <div className="col-lg-2">
            <img className="img-fluid" src="/img/img-placeholder.png" alt="Product" />
          </div>
          <div className="col-lg-2">
            <img className="img-fluid" src="/img/img-placeholder.png" alt="Product" />
          </div>
          <div className="col-lg-2">
            <img className="img-fluid" src="/img/img-placeholder.png" alt="Product" />
          </div>
          <div className="col-lg-2">
            <img className="img-fluid" src="/img/img-placeholder.png" alt="Product" />
          </div>
          <div className="col-lg-2">
            <img className="img-fluid" src="/img/img-placeholder.png" alt="Product" />
          </div>
          <div className="col-lg-2">
            <img className="img-fluid" src="/img/img-placeholder.png" alt="Product" />
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
  render() {
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