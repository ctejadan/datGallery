import React from 'react';
import { render } from 'react-dom';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imagen: "", opciones: ""};
  }
  componentWillMount() {//Obtiene imagenes en la carpeta 5000
    let thisSave1 = this;
    $.get("http://localhost:3000/opciones", data =>{thisSave1.setState({opciones : data});});
     }

  onClickBorrar(a) {
    if (confirm("Seguro que desea eliminar la imagen?") == true) {
        let thisSave1 = this;
        $.get("http://localhost:3000/borrar",{foto:a}, data =>{thisSave1.setState({imagen:data});});
    }
  }
  onClickAmpliar(a) {window.open('/pictures?picture='+this.props.seleccionado+'/'+a, '_blank');}

  onClickOpcion(option){

    let thisSave1 = this;
    $.get("http://localhost:3000/imagenes",{select: option}, data =>{
      thisSave1.setState({imagen : data});
      thisSave1.props.updateOpcion(option);
    });
  }
  cutName(str) {
    if(str.length>15)
      str=str.substring(0,15)+"...";
    return str;
  }
  render () {

    let opciones = this.state.opciones;
    let option = [];
    if (opciones){
      opciones.forEach((a) => option.push(<tr onClick={()=>this.onClickOpcion(a)}><td>{a}</td></tr>));
    }

    let imagen=this.state.imagen;
    let array5= [[],[],[],[],[]];

    let menu = (<div className="col-sm-2">
                    <table className="table table-striped">
                        <tbody>
                            {option}
                            <tr><td><span className="glyphicon glyphicon-plus" style={{color: "green", marginTop: "1%", marginLeft: "2%"}}> </span></td></tr>
                        </tbody>
                    </table>
                </div>);

    let printFotos =(<h2>Elije una opcion</h2>);

    if(imagen && this.props.seleccionado!=''){
          let numFotos= imagen.length;
          imagen.forEach( (a,i) => array5[i%5].push(a));

          printFotos = array5.map( (b,i)=>(
              <div key={i} className="col-sm-2 col-xs-4">
                  {b.map( (a,i2)=>(<div key={i2}>
                        <img src={"/fotos?foto="+this.props.seleccionado+"/"+a} style={{marginTop: "1%"}} onClick={()=>this.onClickAmpliar(a)}/>
                        <p>{this.cutName(a)}
                            <span className="glyphicon glyphicon-remove" style={{marginTop: "1%", marginLeft: "2%"}} onClick={()=>this.onClickBorrar(a)}> </span>
                        </p>
                  </div>))}
              </div>));
      }
      return(
        <div className="row">
              {menu}
              {printFotos}
        </div>
      );
    }
}

export default (Gallery);
