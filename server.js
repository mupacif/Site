var http = require('http');
var url = require('url');
var fs = require('fs');
//var querystring = requite('querystring');

var server = http.createServer(function(req,res){
//chargemnt d'un page html
var page = url.parse(req.url).pathname;
    if(page=="/")
	page='index.html';
console.log(page);
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
