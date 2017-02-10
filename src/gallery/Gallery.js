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
    $.get("/opciones", data =>{thisSave1.setState({opciones : data});});
    $.get("/aleatorio", data =>{thisSave1.setState({imagen : data});});

     }

     componentWillReceiveProps() {//ACTUALIZA AL MOMENTO DE SUBIR
           let thisSave1 = this;
           setTimeout(() => {
             $.get("/imagenes",{select: this.props.seleccionado}, data =>{
                 thisSave1.setState({
                     imagen : data
                 });
             });
            }, 2000);
         }

  onClickBorrar(a) {
    if (confirm("Seguro que desea eliminar la imagen?") == true) {
        let thisSave1 = this;
        $.get("/borrar",{foto:a, select: this.props.seleccionado}, data =>{thisSave1.setState({imagen:data});});
    }
  }
  onClickAmpliar(a) {window.open('/pictures?picture='+this.props.seleccionado+'/'+a, '_blank');}

  onClickAmpliarRandom(a) {
    let separator = a.split("/");
    window.open('/pictures?picture='+separator[0]+"/"+separator[1], '_blank');}

  onClickAdd() {
    let str=this.state.typed.trim();
    if(str!="" && str!=" "){
      if(str.length>15){
        alert('Nombre excede el largo (15 caracteres)');
      }
      else{
        let thisSave1 = this;
        thisSave1.setState({opciones : ""});
        $.get("/new", {new:str}, data =>{thisSave1.setState({opciones : data})});
        //$.get("/opciones", data =>{thisSave1.setState({opciones : data});});
      }
    }
  }

  onBlur(event) {
    this.setState({typed: event.target.value});
    }

  onClickOpcion(option){

    let thisSave1 = this;
    $.get("/imagenes",{select: option}, data =>{
      thisSave1.setState({imagen : data});
      thisSave1.props.updateSeleccionado(option);
    });
  }

  onClickRemoveFolder(){
    let thisSave1 = this;
    $.get("/removeFolder", {select: this.props.seleccionado}, data =>{thisSave1.setState({opciones : data, imagen : ""});});
    thisSave1.props.updateSeleccionado("");
    $.get("/aleatorio", data =>{thisSave1.setState({imagen : data});});
    //console.log(this.props.seleccionado);

  }

  cutName(str) {
    if(str.length>15)
      str=str.substring(0,15)+"...";
    return str;
  }
  render () {

    let borrarCarpeta = '';
    let opciones = this.state.opciones;
    let option = [];
    if (opciones){

      opciones.forEach((a) => {
        if(a==this.props.seleccionado){
          option.push(
            <tr style={{cursor: "pointer"}}>
              <td style={{background: "#F9F9F9"}}>
                <div className="col-xs-12" onClick={()=>this.onClickOpcion(a)} style={{color: "#000"}}>
                    {a}
                </div>
             </td>
            </tr>);
        }
        else{
          option.push(
            <tr style={{cursor: "pointer"}}>
              <td>
                <div className="col-xs-12" onClick={()=>this.onClickOpcion(a)} style={{color: "#696969"}}>
                    {a}
                </div>
             </td>
            </tr>);
        }

        });

        option.unshift(<tr style={{cursor: "pointer"}}><td>
                <input placeholder="Agregar" onBlur={this.onBlur.bind(this)} className="form-control" type="text" style={{width: "75%", marginLeft: "5%", display: "inline"}}/>
                <span onClick={()=>this.onClickAdd()} className="glyphicon glyphicon-plus" style={{color: "#5C5C5C", marginTop: "1%", marginLeft: "5%"}}> </span>
            </td></tr>);
    }


    let imagen=this.state.imagen;
    let array5= [[],[],[],[],[]];
    let menu = (<div className="col-sm-2">
                    <table className="table">
                        <tbody>
                          {option}
                        </tbody>
                    </table>
                </div>);

    let printFotos =(<h2>Elije una opcion</h2>);

    if(this.props.seleccionado!==""){
      if (!this.state.imagen[0]) {
        printFotos =(<h2 onClick={()=>this.onClickRemoveFolder()} style={{cursor: "pointer", textAlign: "center"}}><span className="glyphicon glyphicon-remove" ></span> Haz click para eliminar la carpeta</h2>);
      }
      else{
          let numFotos= imagen.length;
          imagen.forEach( (a,i) => array5[i%5].push(a));
          printFotos = array5.map( (b,i)=>(
              <div key={i} className="col-sm-2 col-xs-4">
                  {b.map( (a,i2)=>(<div key={i2}>
                        <img src={"/fotos?foto="+this.props.seleccionado+"/"+a} style={{marginTop: "1%", cursor: "pointer", borderRadius: "20px"}} onClick={()=>this.onClickAmpliar(a)}/>
                        <p>{this.cutName(a)}
                            <span className="glyphicon glyphicon-remove" style={{marginTop: "1%", marginLeft: "2%"}} onClick={()=>this.onClickBorrar(a)}> </span>
                        </p>
                  </div>))}
              </div>));
      }
    }

    else {
      if(imagen){
        let aux=[];
        let i=0;
        let a ="";
        for (i = 0; i < 20; i++) {
          aux.push(imagen[Math.floor(1 + Math.random() * imagen.length-1)]);
        }
        aux.forEach( (a,i) => array5[i%5].push(a));
        printFotos = array5.map( (b,i)=>(
            <div key={i} className="col-sm-2 col-xs-4">
                {b.map( (a,i2)=>(<div key={i2}>
                      <img src={"/fotos?foto="+a} style={{marginTop: "1%", marginBottom: "10%", cursor: "pointer", borderRadius: "20px"}} onClick={()=>this.onClickAmpliarRandom(a)}/>
                </div>))}
            </div>));
      }
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
