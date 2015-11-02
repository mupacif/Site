var http = require('http');
var url = require('url');
var fs = require('fs');
//var querystring = requite('querystring');

var server = http.createServer(function(req,res){
//chargemnt d'un page html
var page = url.parse(req.url).pathname;
    if(page=="/")
	page='index.html';
fs.readFile('./'+page,'utf-8',
 function(error, content)
  {
   if(!error)
{
  if(page.indexOf(".html")>-1)
{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(content);
}
  if(page.indexOf(".jpg")>-1)
{
    res.writeHead(200,{"Content-TYpe":"img/jpg"});
    res.end(content, 'binary')
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
