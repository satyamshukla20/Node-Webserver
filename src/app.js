const path=require('path')
const express=require('express');
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast');
const { response } = require('express');

const app=express();



const publicdirectorypath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(publicdirectorypath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        nameis:'Satyam'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        nameis:'Satyam'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'kindly provide the issue ,you need the answer for',
        title:'help',
        nameis:'satyam',
    })
})





app.get('',(req,res)=>{
  res.send('hello express')
})



app.get('/help',(req,res)=>{
    res.send({
        nameis:'Satyam',
        age:21
    })
})

app.get('/weather',(req,res)=>{
   if(!req.query.address) 
   {
       return res.send({error:'This is an error..please request an address in form of query string.'})
   }
    // res.send({
    //     forecast:'the current temperature outside is 30 degree celsius',
    //     location:req.query.address
    // })
    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error)
        {
            return res.send({error:error})
        }

        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error)
            {
               return response.send({error:error})
            }
            res.send({forecastdata:forecastdata,
                      place:place,
                      
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
      return  res.send({error:'the search query is not provided..kindly provide it in form of query string.'})
    }
    console.log(req.query.search);
    res.send({products:[]})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormessage:"Article Unavailable"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errormessage:"my 404 page"
    })
})

app.listen(3000,()=>{
    console.log('server is up at port 3000');
})