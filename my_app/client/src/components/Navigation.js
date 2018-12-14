import React from 'react';

export class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">FruitShop</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/category/fruta">Fruta<span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/category/legumes">Legumes</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0" action="/search">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/login"><i className="fas fa-sign-in-alt"></i> Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register"><i className="fas fa-user-plus"></i> Register</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cart"><i className="fas fa-shopping-cart"></i> Shopping Cart</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export class Footer extends React.Component {
  render() {
    return (
      <div className="container mt-5">
        <footer className="footer">
          <span className="text-muted">FEUP SINF 2018</span>
        </footer>
      </div>
    );
  }
}

export default Navigation;