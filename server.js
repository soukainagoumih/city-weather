const http = require('http');
const server = http.createServer((req, res) => {
    // Request handling logic goes here
    server.listen(3000, () => {
      console.log
    });
  });

  const url = require('url');

// Inside the request handler
const parsedUrl = url.parse(req.url, true);
const path = parsedUrl.pathname;
const query = parsedUrl.query;
