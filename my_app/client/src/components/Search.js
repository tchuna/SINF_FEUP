import React, { Component } from 'react';
import Navigation from './Navigation.js';
import {Redirect} from 'react-router-dom';



class Search extends Component {
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
    return (
      <div>
        <Navigation />

            <div className="container">
                <h2>Results for search "input"</h2>

            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="jumbotron">
                            <img className="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="img"></img>
                            <h5>Product Name</h5>
                            <p>Price</p>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="jumbotron">
                            <img className="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="img"></img>
                            <h5>Product Name</h5>
                            <p>Price</p>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="jumbotron">
                            <img className="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="img"></img>
                            <h5>Product Name</h5>
                            <p>Price</p>
                        </div>

                    </div>


                </div>



            </div>

      </div>
    );
  }
}

export default Search;
