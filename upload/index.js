var server=require("./server");//使用server模块
var router=require("./router");
var requestHandlers=require("./requestHandlers");
//建立一个处理请求的集合handle
var handle={}
//将不同的URL映射到相同的请求处理程序上，只需再对象中添加一个键为"/"的属性
//配置/和/start的请求交由requestHandlers.start来处理
handle["/"]=requestHandlers.start;
handle["/start"]=requestHandlers.start;
handle["/upload"]=requestHandlers.upload;
handle["/show"]=requestHandlers.show;
//调用server下的公共方法
server.start(router.route,handle);//将路由函数和处理请求对象handle注入server.js

