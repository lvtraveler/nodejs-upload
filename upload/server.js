//放置http服务器模块
//建议一个HTTP服务器

var http=require('http');//使用nodejs内置的http模块
var url=require('url');//使用内置的url模块


// http.createServer(function(request,response){
// 	response.writeHead(200,{"Content-Type":"text/plain"});
// 	response.write("Hello World");
// 	response.end();
// }).listen(8888);

// function onRequest(request,response){
// 	console.log('接收到请求！');
// 	response.writeHead(200,{"Content-Type":"text/plain"});
// 	response.write("Hello World");
// 	response.end();
// }
// http.createServer(onRequest).listen(8888);
// console.log('服务器已经启动！');

function start(route,handle){
	function onRequest(request,response){
	// var postData="";	
	var pathname=url.parse(request.url).pathname;

	console.log('接收到'+pathname+'请求！');
	route(handle,pathname,response,request);
	//设置接收数据的编码格式为utf-8
	// request.setEncoding("utf8");
	//给request注册data事件
	// request.addListener("data",function(postDataChunk){
	// 	postData+=postDataChunk;
	// 	console.log("接收POST过来的数据块"+postDataChunk+".");
	// });
	//给request注册end事件，end事件只会触发一次
	// request.addListener("end",function(){
		//将POST数据传递给请求路由
	// 	route(handle,pathname,response,postData);
	// });
	//	将onRequest中所有关于response的操作交由route()完成
	// route(handle,pathname,response);

	// response.writeHead(200,{"Content-Type":"text/plain"});
	// response.write("Hello NodeJS");
	// response.end();
	}
	http.createServer(onRequest).listen(8888);
	console.log('服务器已经启动！');
}

exports.start=start;
