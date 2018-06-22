let express=require('express')
let apilist=require('./apilist')
let app=express();
let queryApi=require('./queryApi')
let bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.all('*',function(req,res,next){
  res.header({
    'Access-Control-Allow-Origin':"http://localhost:8080", //可以是* 代表全部  这是cors
    "Accept-Content":"application/json,plain/text",
    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  })
  next()
})

apilist(app)
queryApi(app)
app.listen('3000',function(){
  console.log('server start at:3000')
})
