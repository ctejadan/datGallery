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

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
                  titulo: "Dat Gallery2",
                  cambios:0
    };
    this.actualiza = this.actualiza.bind(this);
  }
  getDefaultProps() {

  }
  actualiza(){
    this.setState({cambios:Math.random()});
  }
  render(){

    let componentConfig = { iconFiletypes: ['.jpg', '.png', '.gif'], showFiletypeIcon: true, postUrl: '/upload' };
    return (<div>
                <div className="page-header" style={{textAlign: "center"}}>
                  <h1>{this.state.titulo}</h1>
                </div>
                <DropzoneComponent  className="center-block" config={componentConfig}
                                  eventHandlers={{ addedfile: (file) => this.actualiza()}}
                                  djsConfig={{autoProcessQueue: true, createImageThumbnails: true}} />
                <hr />
                <Gallery actualiza={this.state.cambios}/>
          </div>);
  }
}

render(<App/>,
  document.getElementById('app')
);
