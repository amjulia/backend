const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {

  const ipAddress = "http://127.0.0.1";
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello"); // тут и будет имя храниться
  if (userName) {
    response.statusCode = 200;
    response.statusMessage = "Ok";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello, ${userName}.`);
    response.end();
    return;
  }
  if( url.searchParams.has("hello") && !userName){
    response.statusCode = 400;
    response.statusMessage = "Bad Request";
    response.setHeader("Content-Type", "text/plain");
    response.write("Enter a name");
    response.end();
    return;
  }
  

  if (request.url === "/?users") {
    response.statusCode = 200;
    response.statusMessage = "Ok";
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();
    return;
  }
  if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "Ok";
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, world!");
    response.end();
    return
  }
    
 response.statusCode = 500;
  response.statusMessage = "Internal Server Error";
  response.end();

  
});
server.listen(3003, () => {
  console.log("Сервер запущен по запросу http://127.0.0.1:3003");
});
