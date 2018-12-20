import React, { Component } from 'react';
import Navigation from './Navigation.js';
import {Redirect} from 'react-router-dom';
import qs from 'qs';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: props.match.params.id,
      data: null,
      result: null,
      redirect: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillMount() {
    if(sessionStorage.getItem('token')){
      console.log("ja existe token");
    }
    else{
      this.setState({redirect: true});
    }
  }

  getData() {
    // Fetch Products
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
        instance: 'DEFAULT',
        grant_type: 'password',
        line: 'professional'
      })
    }).then(response => response.json())
      .then(function(data) {
        obj =JSON.parse(JSON.stringify(data));
      })
      .then(() => {
        this.getProducts(obj.access_token);
      });
}

  getProducts(token){
      let query = JSON.stringify("Select Distinct Artigo.Artigo, Artigo.Descricao, ArtigoMoeda.PVP1 FROM Artigo INNER JOIN ArtigoMoeda ON Artigo.Artigo = ArtigoMoeda.Artigo");
      fetch('http://localhost:2018/WebApi/Administrador/Consulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          'Authorization': 'Bearer '+token
        },
        body: query,
      }).then(response => response.json())
      .then(data => this.setState({ data }))
      .then(() => {
        this.filterList();
      });
  }

  filterList(){
    var list = [];
    let input = "";
    if(this.state.input){
      console.log(this.state.input);
      input = this.state.input;
    }

    if (this.state.data) {
      let obj =JSON.parse(JSON.stringify(this.state.data));
      let products = obj.DataSet.Table;
      list = products.filter(function(item){
        let it = item.Descricao;
        return it.toLowerCase().search(input.toLowerCase()) !== -1;
      });
    }
    this.setState({result: list});
  }


  render() {
    if(this.state.redirect){
      return (<Redirect to={'/login'}/>)
    }

    var resultsList;

    if(this.state.result != null){
       resultsList = this.state.result.map(product =>{
        console.log(product.Artigo);
        return (
          <div key={product.Artigo} className="col-lg-4">
              <div className="jumbotron">
                <a href={"../products/" + product.Artigo}>
                <img className="img-responsive" width="275" height="180" src={'../img/' + product.Artigo + '.png'} alt="img"></img>
                  <h5>{product.Descricao}</h5>
                  <p>Price: {product.PVP1}€</p>
                </a>
              </div>
          </div>
        )
      })
    }

    return (
      <div>
        <Navigation />
            <div className="container">
                <h2>Results for search "{this.state.input}"</h2>
            </div>
            <div className="container">
                <div className="row">
                    {resultsList}
                </div>
            </div>
      </div>
    );
  }
}

export default Search;
