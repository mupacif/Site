var qs = require('querystring');
var mysql = require('mysql');
var http = require('http');
var url = require('url');
var fs = require('fs');
var result = null;
//var querystring = requite('querystring');
var mySqlClient = mysql.createConnection({
host : "xxxxxxxxx",
user : "pacimod1",
password : "ertexs",
database : "base1"

});
var selectQuery = 'SELECT * FROM Member';
function msql(selectQuery)
{
mySqlClient.query(
selectQuery,
function select(error, results, fields) {
if (error) {
console.log(error);
      mySqlClient.end();
      return;
    }
    if ( results.length > 0 )  { 
      result = results;
      var firstResult = results[ 0 ];
      console.log('id: ' + firstResult['id']);
      console.log('login: ' + firstResult['login']);
      console.log('password: ' + firstResult['password']);
    } else {
      console.log("Pas de données");
    }
    //mySqlClient.end();
  }
);
}


var post = function (request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            console.log(post['login']);
            console.log(post['password']);
        });
    }
 }   
    
var server = http.createServer(function(req,res){
post(req,res); 
//chargemnt d'un page html
var page = url.parse(req.url).pathname;
    if(page=="/")
	page='index.html';
//console.log(page);
fs.readFile('./'+page,
 function(error, content)
  {
   if(!error)
{
  if(page.indexOf(".html")>-1)
{
    res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
    res.end(content);
}
 else if(page.indexOf(".jpg")>-1)
{
    res.writeHead(200,{"Content-Type":"img/jpg"});
    res.end(content, 'binary')
}
 else if(page.indexOf(".css")>-1)//else if(\.((css)$/.test(page))) marche aussi
{
    res.writeHead(200,{"Content-Type":"text/css"});
    res.end(content);
}
 else if(page.indexOf(".js")>-1)//else if(\.((css)$/.test(page))) marche aussi
{
    res.writeHead(200,{"Content-Type":"text/javascript"});
    res.end(content);
}

}else
{
    res.writeHead(404,{"Content-Type":"text/html"});
    res.end("404 Unknown page");

}
  }
);

});


var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
msql(selectQuery);
    console.log('hello');
    socket.emit('message',result);
//    socket.emit('message', 'Vous êtes bien connecté');   
});


server.listen(8888);



