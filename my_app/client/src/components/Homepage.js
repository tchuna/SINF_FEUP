import React, { Component } from 'react';
import Navigation from './Navigation.js';

class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      data: null,
    };
 
  }
 
  componentDidMount () {
    this.getData();
  }

  getData () {
      // Fetch Products
  }
 
  render() {
    return (
      <div>
        <Navigation />

        <div class="container main-container mt-5 mb-3">

          <div class="mb-3 row">
            <div class="row">

              <div class="col-lg-6">
                <h4>Fruta</h4>
                <img class="img-fluid" src="https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia11274/slide/alimentacao-cursos-cpt_frutas_2.jpg" alt="Chania"></img>
              </div>
              
              <div class="col-lg-6">
                  <h4>Legumes</h4>
                  <img class="img-fluid" src="https://i.pinimg.com/originals/e9/eb/11/e9eb11aca59e512ccff2ef12a52c3669.jpg" alt="Chania"></img>
              </div>

            </div>
          </div>

          <div class="mb-3">
            <h4>Sugestões</h4>
            <div class="row">

                <div class="col-lg-2">
                  <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                </div>
                <div class="col-lg-2">
                    <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                </div>
                <div class="col-lg-2">
                    <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                </div>
                <div class="col-lg-2">
                    <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                </div>
                <div class="col-lg-2">
                    <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                </div>
                <div class="col-lg-2">
                    <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                </div>

              </div>
            </div>

            <div class="mb-3">
              <h4>Novidades</h4>
              <div class="row">

                  <div class="col-lg-2">
                      <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                    </div>
                    <div class="col-lg-2">
                        <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                    </div>
                    <div class="col-lg-2">
                        <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                    </div>
                    <div class="col-lg-2">
                        <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                    </div>
                    <div class="col-lg-2">
                        <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                    </div>
                    <div class="col-lg-2">
                        <img class="img-fluid" src="https://uetitalia.it/wp-content/uploads/2018/09/blog-placeholder.png" alt="Chania"></img>
                    </div>

            </div>
          </div>

        </div>

      </div>
    );
  }
}
 
export default App;