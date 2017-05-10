# Project Name

node-static-server

***
## Intro

这是node搭建的一个简单的静态文件服务，并且可以提供简单的api接口，可用于前端数据模拟使用。
为了能更简单的使用，暂时不支持提交数据的处理

***
## Use

	git https://github.com/StopllL/node-static-server-v.git
	cd node-static-server-v

	node -v 				// 检查是否有node环境，如果没有则安装node，有则下一步

	node index.js

控制台会显示server start:127.0.0.1:8080表示服务器以启动，浏览器中输入 127.0.0.1:8080/index.html

静态资源访问：
	root/index.html							127.0.0.1:8080/index.html
	root/javacript/xx.js					127.0.0.1:8080/javascript/xx.js
	root/css/xx.css							127.0.0.1:8080/css/xx.css

***
## DIR

	index.js	为静态服务启动文件
	config.json	为api配置文件，配置路由对应的返回数据，返回数据为json格式
	module		为静态服务配置文件
	root		为静态文件放置文件


***
## Config
	
	// config.json
	{
		'/data':{'name':'StopllL'}
	}

	// js调用
	$.ajax({
		url:'127.0.0.1:8080/API/data',
		type:'POST',
		success:function(data){
			console.log(data)
		},
		error:function(data){
			console.log(data)
		}
	})


***
## Attention

如果端口号被占用需要改变端口号，请打开module/server.js  改变PORT = 8080改为你想要开启的端口号
