import React from 'react';
import { render } from 'react-dom';

class SelectGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {opciones:""};
  }

  componentWillMount() {//Obtiene las carpetas en la carpeta 5000
    let thisSave1 = this;
    $.get("http://localhost:3000/opciones", data =>{
        thisSave1.setState({
              opciones : data
        });
    });
  }

componentWillReceiveProps(){

}

  onClickOpcion(option){
    let thisSave1 = this;
    console.log("aqui 1"+ this.state.seleccion);

    thisSave1.setState({seleccion : true});
    componentWillReceiveProps();
    console.log("aqui 2"+ this.state.seleccion);
  }

  onClickAdd(){
    alert("anadir");
  }

  render () {
    console.log(this.state.opciones);
    let opciones = this.state.opciones;
    let option = [];
    if (opciones){
      opciones.forEach((a) => option.push(<tr onClick={()=>this.onClickOpcion(a)}><td>{a}</td></tr>));
    }

      return(
        <div className="row">
          <div className="container center-block">
            <table className="table table-striped" style={{borderRadius: "5px", width: "50%", margin: "auto", float: "none"}}>
              <tbody>
                  {option}
              <tr onClick={()=>this.onClickAdd()}><td><span className="glyphicon glyphicon-plus" style={{color: "green", marginTop: "1%", marginLeft: "2%"}}> </span></td></tr>
              </tbody>
            </table>
          </div>
        </div>


      );
    }
  }

export default (SelectGallery);
