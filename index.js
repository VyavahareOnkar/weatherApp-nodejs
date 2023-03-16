const fs = require("fs");

const http = require("http");
const requests = require("requests");




const readFile=fs.readFileSync("home.html","utf-8");


const replaceWithData=(htmlfile,objInArray)=>{
    let temperature=htmlfile.replace("{%tempVal%}",objInArray.main.temp);
     temperature=temperature.replace("{%tempMin%}",objInArray.main.temp_min);
     temperature=temperature.replace("{%tempMax%}",objInArray.main.temp_max);
     temperature=temperature.replace("{%location%}",objInArray.name);
     temperature=temperature.replace("{%country%}",objInArray.sys.country);
     temperature=temperature.replace("{%tempstatus%}",objInArray.weather[0].main);
    // console.log(objInArray.main);
    return temperature;
}

const server=http.createServer((req,res)=>{

    // YOu have to enter the api key in place of {apikey}:---->>>

    requests("https://api.openweathermap.org/data/2.5/weather?q=Pune,In&APPID={apikey}")

    .on("data",(chunk)=> {
        const objData=JSON.parse(chunk);
        const arrayOfObj=[objData];
        
        let realTimeData=arrayOfObj.map((val)=> replaceWithData(readFile,val)).join("");
       res.write(realTimeData);
       res.end();
    //   console.log(arrayOfObj);
    })
    .on("end", (err)=> {
      if (err) return console.log('connection closed due to errors', err);
     
      res.end();
    });
});



server.listen(8000,"127.0.0.1",()=>{
    console.log("server started");
});


