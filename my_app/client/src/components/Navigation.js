import React from 'react';
import {Redirect} from 'react-router-dom';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logedIn: false,
      doLogOut: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if(sessionStorage.getItem('token')){
      console.log("ja existe token");
      this.setState({logedIn: true});
    }
    else{
      this.setState({logedIn: false});
    }
  }


  logout(){
    sessionStorage.setItem('token','');
    sessionStorage.setItem('userID','');
    sessionStorage.clear();
    this.setState({doLogOut: true});
  }

  render() {

    if(this.state.doLogOut){
      return (<Redirect to={'/login'}/>)
    }

    if(!sessionStorage.getItem('token')){
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">FruitShop</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      )
    }

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
            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/profile"><i className="fas fa-sign-in-alt"></i> Profile</a>
            </li>
            <li className="nav-item">
              <button className="btn my-2 my-sm-0" onClick={this.logout}>Logout</button>
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
      <div className="container my-3">
        <footer className="footer">
          <span className="text-muted">FEUP SINF 2018</span>
        </footer>
      </div>
    );
  }
}

export default Navigation;
