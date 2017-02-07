import React from 'react';
import { render } from 'react-dom';
//Object.keys(a.contenido[o].forEach (k=>{if(x!=k) series.push(k)}))

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imagen: "", opciones: "", typed: ""};

  }
  componentWillMount() {//Obtiene imagenes en la carpeta 5000
    let thisSave1 = this;
    $.get("http://localhost:3000/opciones", data =>{thisSave1.setState({opciones : data});});

     }

  componentWillReceiveProps() {//ACTUALIZA AL MOMENTO DE SUBIR
      let thisSave1 = this;
      setTimeout(() => {
        $.get("http://localhost:3000/imagenes",{select: this.props.seleccionado}, data =>{
            thisSave1.setState({
                imagen : data
            });
        });
       }, 2000);
    }

  onClickBorrar(a) {
    if (confirm("Seguro que desea eliminar la imagen?") == true) {
        let thisSave1 = this;
        $.get("http://localhost:3000/borrar",{foto:a, select: this.props.seleccionado}, data =>{thisSave1.setState({imagen:data});});
    }
  }
  onClickAmpliar(a) {window.open('/pictures?picture='+this.props.seleccionado+'/'+a, '_blank');}

  onClickAdd() {
    if(this.state.typed!=""){
      let thisSave1 = this;
      $.get("http://localhost:3000/new", {new:this.state.typed}, data =>{thisSave1.setState({opciones : data})});
    }
  }

  onBlur(event) {
      this.setState({typed: event.target.value});
    }

  onClickOpcion(option){

    let thisSave1 = this;
    $.get("http://localhost:3000/imagenes",{select: option}, data =>{
      thisSave1.setState({imagen : data});
      thisSave1.props.updateOpcion(option);
    });
  }

  onClickRemoveFolder(option){

    console.log(option);
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
      opciones.forEach((a) => option.push(
        <tr style={{cursor: "pointer"}}>
          <td>
            <div className="col-xs-8">
              <p style={{marginLeft: "5%"}} onClick={()=>this.onClickOpcion(a)}>
                {a}
              </p>
            </div>
            <div className="col-xs-2">
              <span onClick={()=>this.onClickRemoveFolder(a)} className="glyphicon glyphicon-remove" >
              </span>
            </div>
          </td>
        </tr>));
    }

    let imagen=this.state.imagen;
    let array5= [[],[],[],[],[]];

    let menu = (<div className="col-sm-2">
                    <table className="table">
                        <tbody>
                          <tr style={{cursor: "pointer"}}><td>
                            <p>
                              <input placeholder="Agregar" onBlur={this.onBlur.bind(this)} className="form-control" type="text" style={{width: "75%", marginLeft: "5%", display: "inline"}}/>
                              <span onClick={()=>this.onClickAdd()} className="glyphicon glyphicon-plus" style={{marginTop: "1%", marginLeft: "5%"}}> </span>
                            </p>
                          </td></tr>
                          {option}
                          <tr><td></td></tr>
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
