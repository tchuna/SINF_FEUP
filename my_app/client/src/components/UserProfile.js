import React, { Component } from 'react';
import Navigation from './Navigation.js';
import {Redirect} from 'react-router-dom';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
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
          <div className="container main-container mt-5">
            <div className="row">
              <div className="col-lg-12">
                <h3>User profile</h3>
              </div>
              <div className="col-lg-3 text-center">
                <img className="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                <br /><br />
                <a href="/" className="btn btn-primary float-center"><i className="fas fa-edit"></i> Edit profile</a>
              </div>

              <div className="col-lg-9">
                <p className="user-bio">
                  Description: It is a long established fact that a reader will be distracted by the
                  readable content of a page when looking at its layout. The point of using
                  Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opp
                  osed to using 'Content here, content here', making it look like readable English. Many des
                </p>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-12">
                <h3>Shopping historic</h3>
              </div>
              <div className="col-lg-8 offset-2">
                <ul className="list-group">
                  <li className="list-group-item"><a href="/">Order 1</a></li>
                  <li className="list-group-item"><a href="/">Order 2</a></li>
                  <li className="list-group-item"><a href="/">Order 3</a></li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h3>Current orders</h3>
              </div>
              <div className="col-lg-8 offset-2" >
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/">Order A </a>
                    <span className="badge badge-success badge-pill">Complete</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/">Order B </a>
                    <span className="badge badge-secondary badge-pill">Ongoing</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/">Order C</a>
                    <span className="badge badge-danger badge-pill">Cancelled</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <a href="/">Order D</a>
                    <span className="badge badge-warning badge-pill">Pending</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12 text-center">
                <a href="/" className="btn btn-secondary float-center"><i className="fas fa-arrow-circle-left "></i> Retroceed</a>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
