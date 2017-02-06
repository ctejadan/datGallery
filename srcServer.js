var express = require('express');
var fs = require('fs');
var path = require('path');
var sesion = require('express-fileupload');
var easyimg = require('easyimage');
var childProcess = require('child_process');

const port = 3000;
const app = express();

app.use(sesion());

app.post('/upload', (req, res)=> {
  let file= req.files.file;
  file.mv("./5000/Images/"+req.query.select+"/"+file.name, a=>console.log(a));

easyimg.thumbnail({
       src:'./5000/Images/'+req.query.select+'/'+file.name, dst:'./5000/Thumbnails/'+req.query.select+'/'+file.name,
       width:150, height:99
//       cropwidth:200, cropheight:200,
//       x:0, y:0
    }).then(
    function(image) {
       console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
    },
    function (err) {
      console.log(err);
    }
  );
res.send(fs.readdirSync('./5000/Images/'+req.query.select));
});

app.use(express.static(__dirname + '/build'))

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, 'index.html'));
});

app.get('/fotos', function(req, res) {
  setTimeout(() => {res.sendFile(path.join( __dirname, '5000/Thumbnails/'+ req.query.foto ));}, 200);
});

app.get('/pictures', function(req, res) {
  setTimeout(() => {res.sendFile(path.join( __dirname, '5000/Images/'+ req.query.picture ));}, 200);
});

app.get('/imagenes', function(req, res) {
  res.send(fs.readdirSync('./5000/Images/'+req.query.select));
});

app.get('/opciones', function(req, res) {
  res.send(fs.readdirSync('./5000/Images/'));
});

app.get('/borrar', function(req, res) {
  console.log(req.query.select);
  childProcess.execSync("rm ./5000/Images/"+req.query.select+"/"+req.query.foto);
  childProcess.execSync("rm ./5000/Thumbnails/"+req.query.select+"/"+req.query.foto);
  res.send(fs.readdirSync('./5000/Images/'+req.query.select));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
});
