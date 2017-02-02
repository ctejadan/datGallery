import React from 'react';
import { render } from 'react-dom';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imagen:""};
  }
  componentWillMount() {//Obtiene imagenes en la carpeta 5000
    let thisSave1 = this;
    $.get("http://localhost:3000/imagenes", data =>{
        thisSave1.setState({
              imagen : data
        });
    });
  }
  componentWillReceiveProps() {//ACTUALIZA AL MOMENTO DE SUBIR
    let thisSave1 = this;
    setTimeout(() => {
      $.get("http://localhost:3000/imagenes", data =>{
          thisSave1.setState({
              imagen : data
          });
      });
     }, 2000);
  }
  onClickBorrar(a) {
    if (confirm("Seguro que desea eliminar la imagen?") == true) {
        let thisSave1 = this;
        $.get("http://localhost:3000/borrar",{foto:a}, data =>{
            thisSave1.setState({imagen:data});
        });
    }
  }
  onClickAmpliar(a) {window.open('/pictures?picture='+a, '_blank');}

  cutName(str) {
    if(str.length>15)
      str=str.substring(0,15)+"...";
    return str;
  }
  render () {
    let imagen=this.state.imagen;
    let array5= [[],[],[],[],[]];
    if(imagen){
          let numFotos= imagen.length;
          imagen.forEach( (a,i) => array5[i%5].push(a));

          let printFotos = array5.map( (b,i)=>(
            <div key={i} className="col-sm-2 col-xs-4">
                {b.map( (a,i2)=>(<div key={i2}>
                      <img src={"/fotos?foto="+a} style={{marginTop: "1%"}} onClick={()=>this.onClickAmpliar(a)}/>
                      <p>{this.cutName(a)}
                          <span className="glyphicon glyphicon-remove" style={{marginTop: "1%", marginLeft: "2%"}} onClick={()=>this.onClickBorrar(a)}> </span>
                      </p>
                </div>))}
            </div>));

          return(
              <div className="row">
                  <div className="col-sm-1 hidden-xs"></div>
                      {printFotos}
                  <div className="col-sm-1 hidden-xs"></div>
              </div>);
    }else{
      return(<p>sin fotos</p>);
    }
  }
}

export default (Gallery);
