const fs = require("fs");
const http = require("http");
const requests = require("requests");

const replaceWithData=(htmlContent,objInArray)=>{
    let temperature=htmlContent.replace("{%tempVal%}",objInArray.main.temp);
     temperature=temperature.replace("{%tempMin%}",objInArray.main.temp_min);
     temperature=temperature.replace("{%tempMax%}",objInArray.main.temp_max);
     temperature=temperature.replace("{%location%}",objInArray.name);
     temperature=temperature.replace("{%country%}",objInArray.sys.country);
    // console.log(temperature);
    return temperature;
}


const readFile=fs.readFileSync("./home.html","utf-8");


const server=http.createServer((req,res)=>{
    requests('https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=f0fc12e0d0bc503ccfea5d7ab9d791f9')
    .on('data',(chunk)=> {
        const objData=JSON.parse(chunk);
        const arrayOfObj=[objData];
        
        const realTimeData=arrayOfObj.map((val)=> replaceWithData(readFile,val)).join("");
       res.write(realTimeData);
    //   console.log(arrayOfObj);
    })
    .on('end', (err)=> {
      if (err) return console.log('connection closed due to errors', err);
     
      res.end();
    });
});



server.listen(8000,"127.0.0.1",()=>{
    console.log("server has been created successfully!");
});