// url解析模块
let url = require('url');
// 文件系统模块
let fs = require('fs');
// 路径解析模块
let path = require('path');

let handler = require('./handler.js')


const mini = {   // 文件后缀名对应的mini类型
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};


function route(res,pathName){
	// 对请求地址进行解码，防止中文乱码;
	pathName = decodeURI(pathName);
	let hasExt = true,		// 判断是否有扩展名
		filePath = '',		// 文件路径
		apiPath = '',		// 接口目录
		isInterface = false;// 是否是接口路径
	isInterface = pathName.split('/')[1] === 'API';  // 判断路径中是API目录么，是API目录就是接口请求
	if(isInterface){
		pathName = pathName.replace('/API','');   // 将路径中的/API字段删掉
		if(pathName && typeof handler.dispatch === 'function'){
			handler.dispatch(res,pathName);
			return false;
		}
		res.writeHead(500,{'Content-Type':'text/html'});
		res.end('<h1>500 Server Error</h1>');
		return false;
	}

	// 静态资路由


	// 如果路径没有扩展名
	if(path.extname(pathName) === ''){
		// 如果不是以/结尾，加/并作301重定向
		if(pathName.charAt(pathName.length-1) != "/"){
			var redirect = `http://${req.headers.host}${pathName}`;
			res.writeHead(301,{
				location:redirect
			});
			res.end();
		}
	}
	

	// 获取资源相对路径
	//let filePath = path.join('root/',pathName);   // 查询app.js同级的root目录下的静态资源
	filePath = path.join('root/',pathName);

	// 获取文件后缀名
	let ext = path.extname(pathName)
	ext = ext?ext.slice(1):'notKnow'

	// 获取对应文件的文档类型
	let contentType = mini[ext];

	// 使用fs模块的exists判断文件是否存在
	fs.exists(filePath,function(exists){
		if(exists){ // 如果文件名存在
			res.writeHead(200,{'Content-Type':contentType});
			let stream = fs.createReadStream(filePath,{flags:'r',encoding:null});
			stream.on('error',function(){
				res.writeHead(500,{'Content-Type':'text/html'});
				res.end('<h1>500 Server Error</h1>');
			})
			stream.pipe(res);
		}else{	// 文件名不存在的情况
			if(hasExt){
				// 如果文件不是程序自动添加的，直接返回404
				res.writeHead(404,{'Content-Type':'text/html'});
				res.end('<h1>404 Not Found</h1>')
			}else{
				// 如果文件时程序自动添加的且存在，则表示拥护希望访问的是该目录下的文件列表
				var html = "<head><meta charset='utf-8'></head>";
				try{
					// 用户访问目录
					let filedir = filePath.substring(0,filePath.lastIndexOf('\\'));
					// 获取用户访问录下的文件列表
					let files = fs.readdirSync(filedir);
					// 将访问路径下的所有文件一一列举出来，并添加超链接，以便用户进一步访问
					for(let i in files){
						let filename = files[i];
						html += `<div><a href="${filename}">${filename}</a></div>`;
					}
				}catch (e){
					html += "<h1>您访问的目录不存在</h1>";
				}
				res.writeHead(200,{'Content-type':'text/html'});
				res.end(html);
			}
		}
	})
}

exports.route = route;
