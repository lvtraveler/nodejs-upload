// var exec=require("child_process").exec;//获取child_process模块的exec()方法
var querystring=require("querystring");//获取querystring模块
var fs=require("fs");//获取node内置模块fs
var formidable=require("formidable");//获取外部模块


//在处理程序中，接收了response参数，对请求作出直接的响应。
function start(response){
	console.log("处理'start'请求已被唤醒！");
	// exec("ls -lah",function(error,stdout,stderr){
	// 	response.writeHead(200,{"Content-Type":"text/plain"});
	// 	response.write(stdout);
	// 	response.end();
	// });
	var body='<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html:'+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post" enctype="multipart/form-data">'+
		'<input type="file" name="upload" multiple="multiple">'+
		'<input type="submit" value="提交" />'+
		'</form>'+
		'</body>'+
		'</html>';

		response.writeHead(200,{"Content-Type":"text/html"});
		response.write(body);
		response.end();

}
function upload(response,request){
	response.setHeader('Content-Type','text/javascript;charset=UTF-8');

	console.log("处理'upload'请求已被唤醒！");
	var form=new formidable.IncomingForm();
	form.parse(request,function(error,fields,files){
		console.log("解析完毕");
		fs.renameSync(files.upload.path,"/tmp/test.png");//重命名
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write("<head><meta charset='utf-8'></head>")
		response.write("接收到得图像：<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}
//显示文件处理请求程序
function show(response) {
	console.log("处理show请求程序已被唤醒！");
	fs.readFile("./tmp/upload.png","binary",function(error,file){
		if(error){
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write(error+"\n");
			response.end();
		}else {
			response.writeHead(200,{"Content-Type":"image/png"});
			response.write(file,"binary");
			response.end();
		}
	});
}

//开放API
exports.start=start;
exports.upload=upload;
exports.show=show;