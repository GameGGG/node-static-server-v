let jsonDate = require('./../config.json');
function dispatch(res,pathName){
	if(jsonDate[pathName]){
		res.writeHead(200,{'Content-Type':'application/json'});
		res.end(JSON.stringify(jsonDate[pathName]));
	}else{
		res.writeHead(404,{'Content-Type':'text/html'});
		res.end('<h1>NOT A FOUND</h1>');
	}
	
}


exports.dispatch = dispatch;
