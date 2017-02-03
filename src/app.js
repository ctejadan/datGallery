/*eslint-disable import/default */
//import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import '../styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DropzoneComponent from 'react-dropzone-component';
import '../node_modules/react-dropzone-component/styles/filepicker.css';
import '../node_modules/dropzone/dist/min/dropzone.min.css';
import Gallery from './gallery/Gallery.js'
import SelectGallery from './selectGallery/SelectGallery.js'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
                  titulo: "Dat Gallery2",
                  cambios:0,
                  seleccion: false,
                  seleccionado: ""
    };
    this.updateSeleccionado = this.updateSeleccionado.bind(this);
  }
  getDefaultProps() {

  }
  actualiza(){
    this.setState({cambios:Math.random()});
  }
  toggleSeleccion(){
      this.setState({seleccion:!this.state.seleccion})
      console.log(this.state.seleccion);
  }
  updateSeleccionado(a){
      this.setState({seleccionado:a})
  }
  render(){

    let componentConfig = { iconFiletypes: ['.jpg', '.png', '.gif'], showFiletypeIcon: true, postUrl: '/upload?select='+ this.state.seleccionado };

    let dropzone = ""
    if(this.state.seleccionado!=""){
      dropzone=(<div>
                      <DropzoneComponent  className="center-block" config={componentConfig}
                        eventHandlers={{ addedfile: (file) => console.log('okDrop!')}}
                        djsConfig={{autoProcessQueue: true, createImageThumbnails: true}} seleccionado={this.state.seleccionado}/>
                        <hr />
                  </div>);
    }


    return (<div>
                <div className="page-header" style={{textAlign: "center"}}>
                  <h1>{this.state.titulo}</h1>
                </div>
                {dropzone}
                <Gallery seleccion={this.state.seleccion} seleccionado={this.state.seleccionado} updateOpcion={this.updateSeleccionado} />

          </div>);
  }
}

render(<App/>,
  document.getElementById('app')
);
