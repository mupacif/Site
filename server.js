var mysql = require('mysql');
var http = require('http');
var url = require('url');
var fs = require('fs');
//var querystring = requite('querystring');
var mySqlClient = mysql.createConnection({
host : "51.254.221.93",
user : "pacimod1",
password : "ertexs",
database : "base1"

});
var selectQuery = 'SELECT * FROM Member';
mySqlClient.query(
  selectQuery,
  function select(error, results, fields) {
    if (error) {
      console.log(error);
      mySqlClient.end();
      return;
    }
 
    if ( results.length > 0 )  { 
      var firstResult = results[ 0 ];
      console.log('id: ' + firstResult['id']);
      console.log('login: ' + firstResult['login']);
      console.log('password: ' + firstResult['password']);
    } else {
      console.log("Pas de données");
    }
    mySqlClient.end();
  }
);
var server = http.createServer(function(req,res){
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

}else
{
    res.writeHead(404,{"Content-Type":"text/html"});
    res.end("404 Unknown page");

}
  }
);

});
server.listen(80);
