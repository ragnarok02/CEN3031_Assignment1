var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
	var parsedUrl = url.parse(request.url);

	/*
    	Your request handler should send listingData in the JSON format if a GET request 
    	is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    	HINT: explore the request object and its properties 
    	http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
	 */
	var pathname = parsedUrl.pathname; //get the path
	if(pathname == '/listings') { //check if the path is the right one
		response.end(listingData); //display the contents of listingData
	} else { //else 404 error Bad Gateway
		response.writeHead(404);
		response.end('Bad gateway error');
	}
	};

//this creates the server
server = http.createServer(requestHandler);	

	
fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
	if(err) { //check if there are any errors
		throw err;
	} else {
		listingData = data; //data contains the contents of JSON
		server.listen(port); //this starts the server
		console.log('Server listening on: http://127.0.0.1:' + port);
	}
});
