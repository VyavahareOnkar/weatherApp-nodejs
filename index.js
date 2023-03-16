const fs = require("fs");
const http = require("http");



const readFile=fs.readFileSync("./home.html","utf-8",(err,))
const server=http.createServer((req,res)=>{
   
});




server.listen(8000,"127.0.0.1",()=>{
    console.log("server has been created successfully!");
});