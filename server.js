var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type':'text/html'});
	fs.readFile('./bin/index.html', null, (err, data) => {
		if(err){
			console.log(err);
			res.writeHead(404);
			res.write('File not found');
		} else {
			res.write(data);
		}
		res.end();
	});
}).listen(2000, '127.0.0.1');


console.log('Server running at http://127.0.0.1:8000');