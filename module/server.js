// http协议模块
let http = require('http');
// url解析模块
let url = require('url');
// 路径解析模块
let path = require('path');

const PORT = 8080;  // 服务监听端口号

function start(route){
	let server = http.createServer((req,res) => {
		let	requestUrl = req.url,							// http请求的url
			pathName = url.parse(requestUrl).pathname;		// 请求的路径名
			console.log(pathName);
			route(res,pathName)

	})

	server.listen(PORT,() => {
		console.log(`server start:127.0.0.1:${PORT}`)
	}) // 服务开始监听端口号
}

exports.start = start;