var express = require('express');
var fs = require('fs');
var path = require('path');
var sesion = require('express-fileupload');
var easyimg = require('easyimage');
var childProcess = require('child_process');
var jsonFolders = require('./jsonFolders.json');

const port = 3000;
const app = express();

//Object.keys(jsonFolders).forEach(key=>{if(jsonFolders[key]!=='')carpetas.push(jsonFolders[key]);});

app.use(sesion());

app.post('/upload', (req, res)=> {
  let file= req.files.file;
  let fileName = file.name.replace(/\s+/g, '');
  file.mv("./5000/Images/"+jsonFolders[req.query.select]+"/"+fileName, a=>{

    easyimg.info('./5000/Images/'+jsonFolders[req.query.select]+'/'+fileName).then(
      function(file) {
        //console.log(file);
        //console.log(file.size);
        console.log(file.size);
        if(file.size<8000000){
          easyimg.thumbnail({
                 src:'./5000/Images/'+jsonFolders[req.query.select]+'/'+fileName, dst:'./5000/Thumbnails/'+jsonFolders[req.query.select]+'/'+fileName,
                 width:150, height:99
          //       cropwidth:200, cropheight:200,
          //       x:0, y:0
              }).then(
              function(image) {
                 console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
              },
              function (err) {
                console.log(err);
                childProcess.execSync("rm ./5000/Images/"+jsonFolders[req.query.select]+"/"+fileName);

              }
            );

        }

        else{
          //console.log("tiro else");
          childProcess.execSync("rm ./5000/Images/"+jsonFolders[req.query.select]+"/"+fileName);
        }
      }, function (err) {
        //console.log("no imagen");
        childProcess.execSync("rm ./5000/Images/"+jsonFolders[req.query.select]+"/"+fileName);
      }
    );

  });//THEN Y VERIFICAR


  res.send(fs.readdirSync('./5000/Thumbnails/'+jsonFolders[req.query.select]));
});

app.use(express.static(__dirname + '/build'))

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, 'index.html'));
});

app.get('/fotos', function(req, res) {
  let sep = req.query.foto.split('/');
  //console.log(sep);
  //console.log(sep[0]);//carpeta
  //console.log(sep[1]);//nombre
  setTimeout(() => {res.sendFile(path.join( __dirname, '5000/Thumbnails/'+ jsonFolders[sep[0]]+"/"+sep[1] ));}, 200);
});

app.get('/pictures', function(req, res) {
  let sep = req.query.picture.split('/');
  setTimeout(() => {res.sendFile(path.join( __dirname, '5000/Images/'+ jsonFolders[sep[0]]+"/"+sep[1] ));}, 200);
});


app.get('/imagenes', function(req, res) {
      res.send(fs.readdirSync('./5000/Thumbnails/'+jsonFolders[req.query.select]));
});

app.get('/aleatorio', function(req, res) {
let aux=[];
let aux2=[];
let aux3=[];

Object.keys(jsonFolders).forEach(key=>{aux2.push(fs.readdirSync('./5000/Images/'+jsonFolders[key]));});
aux=Object.keys(jsonFolders);

  for (i = 0; i < aux.length; i++) {
    for (j = 0; j < aux2[i].length; j++){
      aux3.push(aux[i]+"/"+aux2[i][j]);
    }
  }
  res.send(aux3);
});


app.get('/new', function(req, res) {
  //revisar si llave existe
  if(!jsonFolders[req.query.new] && req.query.new!==""){
    let aux = [];
    let nuevo = 0;
      Object.keys(jsonFolders).forEach(key=>{aux.push(jsonFolders[key])});
      aux=Object.keys(aux).map(key => aux[key].split('C')[1]).sort(function(a,b){return a - b});

      for (i = 0; i < 49; i++) {
          if(aux[i] != i+1) {
           nuevo = i+1;
           break;
         }
      }
      jsonFolders[req.query.new] = 'C'+nuevo;
      fs.writeFile('jsonFolders.json', JSON.stringify(jsonFolders), 'utf8');
      res.send(Object.keys(jsonFolders));

  }
  else {
    console.log('Error');
  }
});

app.get('/removeFolder', function(req, res) {
  delete jsonFolders[req.query.select];
  fs.writeFile('jsonFolders.json', JSON.stringify(jsonFolders), 'utf8');
  res.send(Object.keys(jsonFolders));

});


app.get('/opciones', function(req, res) {
  res.send(Object.keys(jsonFolders));
});

app.get('/borrar', function(req, res) {
  childProcess.execSync("rm ./5000/Images/"+jsonFolders[req.query.select]+"/"+req.query.foto);
  childProcess.execSync("rm ./5000/Thumbnails/"+jsonFolders[req.query.select]+"/"+req.query.foto);
  res.send(fs.readdirSync('./5000/Images/'+jsonFolders[req.query.select]));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
});
