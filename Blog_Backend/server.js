// This code perform a task to start the server

const http = require("http");
const app = require("./app");
const port = process.env.PORT || 8080;

// creating a server

const server = http.createServer(app);

server.listen(port,() =>{
  console.log(`server is listening to port ${port}`);
})