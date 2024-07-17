const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {

  const ipAddress = "http://127.0.0.1";
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello"); // тут и будет имя храниться
  if (userName) {
    response.status = 200;
    response.statusMessage = "Ok";
    response.header = "Content-Type: text/plain";
    response.write(`Hello, ${userName}.`);
    response.end();
    return;
  }
  if (request.url === "/?hello"){
    response.status = 400;
    response.statusMessage = "Bad Request";
    response.header = "Content-Type: text/plain";
    response.write("Enter a name");
    response.end();
    return;
  }
  

  if (request.url === "/?users") {
    response.status = 200;
    response.statusMessage = "Ok";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }
  if (request.url === "/") {
    response.status = 200;
    response.statusMessage = "Ok";
    response.header = "Content-Type: text/plain";
    response.write("Hello, world!");
    response.end();
  }
    
 
  response.status = 500;
  response.statusMessage = "Internal Server Error";
  response.end();
});
server.listen(3003, () => {
  console.log("Сервер запущен по запросу http://127.0.0.1:3003");
});
