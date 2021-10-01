const request =require('request');

const forecast=(latitude,longitude,callback)=>{
const url='https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=1c302bfaf80ab1f7327dc42512f76814&units=metric&lang=sp';

request({url,json:true},(error,{body})=>{
     // console.log(response)
     
     const current=body;
    //  console.log('it is currently '+current.main.temp+" there is a chance of rain happening')
      if(error)
     {
          
          callback('unable to connect with the forecasting services',undefined);
     }
     else if(body.message)
     {
          callback('the place you have been searching for is not on earth.try another search',undefined);
     }
     else
     {
        callback(undefined,'it is currently '+current.main.temp+' there is a chance of rain happening')
     }
})
}

module.exports=forecast;
