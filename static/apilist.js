let fs=require('fs');
let path=require('path');
let jwt=require('jsonwebtoken');
let multer=require('multer');
// let upload=multer({
//   dest:path.resolve(__dirname,'imgs')
// })

let storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,path.resolve(__dirname,'imgs'))
  },
  filename:function(req,file,cb){
    let o=file.originalname.split('.');
    cb(null,o[0]+'-'+Date.now()+'.'+o[1])
  }
})
let upload=multer({storage:storage})

//定义接口
module.exports=function(app){
  let paths=path.resolve(__dirname+'/data')
  app.get('/index/recommend.action',(req,res)=>{
    // console.log(req.query);
    if(req.query>4){
      res.json({
        code:1000,
        msg:'没有更多数据了'
      })
    }else{
      let data=fs.readFileSync(paths+`/data${req.query.page}.json`,'utf-8');
        // console.log(data1.recommend)
        // console.log(data)

        setTimeout(()=>{
          res.json(data)
        },1000)

    }
  })

  //分类
  const queryApi=require('./queryApi');
  app.get('/static/data/list',(req,res)=>{
    let lists =  fs.readFileSync(path.resolve(__dirname,'data/list.json'),'utf-8');
    // console.log(lists)
    res.end(lists)
  })
  app.get('/api/classify',(req,res)=>{
    // req.query.cid=17951828;
    queryApi(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data=>{
      // res.json(JSON.stringify(data))
      res.end(data)
    })
  })

  //注册
  app.post('/api/register',function(req,res){
    let { username, password } = req.body;
    let userPath=path.resolve(__dirname+'/user');
    let user=JSON.parse(fs.readFileSync(userPath+'/user.json','utf-8'));
    let ind=null;
    user.forEach((i)=>{
      if(i.username==username&&i.password==password){
        ind=i
      }
    })
    if(ind){
      res.json({code:"1001",msg:"该用户已存在"})
      return;
    }
    user.push(req.body)
    fs.writeFile(userPath+'/user.json',JSON.stringify(user),function(err){
      if(err){throw err}
    })
    res.json({code:'1002',msg:'注册登录'})
  })

  //登录
  app.post('/api/login',(req,res)=>{
    let { username, password } = req.body;
    let loginPath=path.resolve(__dirname+'/user');
    let login=JSON.parse(fs.readFileSync(loginPath+'/user.json','utf-8'));
    if(login.some(item=>{
      return username==item.username && password==item.password;
    })){
      let token=jwt.sign(req.body,'1601E',{
        expiresIn:60*60
      })
      res.json({
        code:1,
        msg:'success',
        token
      })
    }else{
      res.json({
        code:0,
        msg:'请输入正确用户名'
      })
    }
  })

  //添加到购物车
  app.post('/api/shop',(req,res)=>{
    jwt.verify(req.body.token,'1601E',(err,decoded)=>{
      if(err){
        res.json({
          msg:'登录超时,请重新登录',
          code:0
        })
        return;
      }else{
        let carpath=path.resolve(__dirname,'carlist/carlist.json');
        let carlist = JSON.parse(fs.readFileSync(carpath,'utf-8'));
        res.json({
          msg:'成功',
          code:1,
          data:carlist[decoded.username] || []
        })
      }
    })
  })
  //购物车页
  app.post('/api/shopcar',(req,res)=>{
    if (!req.body.token) {
        res.status(304)
        res.json({
            msg: "参数错误,token缺失",
            code: 2
        })
        return
    }
    jwt.verify(req.body.token,'1601E',(err,decoded)=>{
      if(err){
        res.json({
          msg:'登录超时,请重新登录',
          code:'0'
        })
      }else{
        let carpath=path.resolve(__dirname,'carlist/carlist.json');
        let carlist = JSON.parse(fs.readFileSync(carpath,'utf-8'));
        if(carlist[decoded.username]){
          let flag=false;
          carlist[decoded.username].map(item=>{
            if(item.wname===req.body.item.wname){
              ++item.count;
              flag=true
            }
          })
          if(!flag){
            let o={
              ...req.body.item,
              count:1
            }
            carlist[decoded.username].push(o)
          }
        }else{
          carlist[decoded.username]=[{count:1,...req.body.item}];
        }
        fs.writeFile(carpath,JSON.stringify(carlist),(err)=>{
          if(err){
            res.json({
              msg:'写入错误',
              code:'0'
            })
          }else{
            res.json({
              msg:'添加成功',
              code:1
            })
          }
        })
      }
    })
  })
  //购物车加减
  app.post('/api/shopcar/count',(req,res)=>{
    if(!req.body.token){
      res.json({
        msg:'参数错误',
        code:2
      })
      return;
    }
    jwt.verify(req.body.token,'1601E',(err,decoded)=>{
      if(err){
        res.json({
          msg:'登录超时,请重新登录',
          code:'0'
        })
      }else{
        let carpath=path.resolve(__dirname,'carlist/carlist.json');
        let carlist = JSON.parse(fs.readFileSync(carpath,'utf-8'));
        let goodslist=carlist[decoded.username];
        //操作数据库
        goodslist=goodslist.map((item,index)=>{
            if(item.wname==req.body.goodsname){
              // console.log(req.body.count)
              item.count=req.body.count
            }
            return item
        })
        carlist[decoded.username]=goodslist
        fs.writeFile(carpath,JSON.stringify(carlist),(err)=>{
          if(err){
            res.json({
              msg:'写入错误',
              code:'0'
            })
          }else{
            res.json({
              msg:'修改成功',
              code:1
            })
          }
        })
      }
    })
    // console.log(req.body.item)
  });
  //删除购物车
  app.post('/api/shopcar/delate',(req,res)=>{
    if(!req.body.token){
      res.json({
        msg:"token缺失",
        code:2
      })
    }
    jwt.verify(req.body.token,'1601E',(err,decoded)=>{
      if(err){
        res.json({
          msg:'登录超时,重新登录'
        })
      }else{
        let carpath = path.resolve(__dirname,'carlist/carlist.json');
        let carlist = JSON.parse(fs.readFileSync(carpath,'utf-8'));
        // console.log(carlist[decoded.username]);
        res.end('111')
      }
    })
  })

  //添加收件人
  app.post('/api/addrecip',(req,res)=>{
      // console.log(req.body)  点击后获取的数据
      let addreciplist=JSON.parse(fs.readFileSync(path.resolve(__dirname,'addrecip/addrecip.json'),'utf-8'))
      jwt.verify(req.body.token,'1601E',(err,decoded)=>{
        if(err){
          res.json({
            code:0,
            msg:"登录超时,请重新登录"
          })
        }else{
         //console.log(addreciplist[decoded.username])
        //  console.log(req.body.data)
          if(addreciplist[decoded.username]){  //判断数据是否存在存在就push进去不存在就添加
            addreciplist[decoded.username].push(req.body.data)
          }else{
            addreciplist[decoded.username]=[req.body.data]
          }
          fs.writeFile(path.resolve(__dirname,'addrecip/addrecip.json'),JSON.stringify(addreciplist),function(err){
            if(err){
              res.json({
                code:0,
                msg:'登录超时,请重新登录'
              })
            }else{
              res.json({
                code:1,
                msg:'添加成功',
                data:addreciplist[decoded.username] || []
              })
            }
          })
        }
      })

  })
  app.post('/api/addrecips',(req,res)=>{
    jwt.verify(req.body.token,'1601E',(err,decoded)=>{
      if(err){
        res.json({
          msg:'登录超时,请重新登录',
          code:0
        })
        return;
      }else{
        let addrecipsList=JSON.parse(fs.readFileSync(path.resolve(__dirname,'addrecip/addrecip.json'),'utf-8'));
        console.log(addrecipsList[decoded.username])
        res.json({
          msg:'成功',
          code:1,
          data:addrecipsList[decoded.username] || []
        })
      }
    })
  })

  //删除地址
  app.post('/api/addDelete',(req,res)=>{
    let addlist=JSON.parse(fs.readFileSync(path.resolve(__dirname,'addrecip/addrecip.json'),'utf-8'));
    let arr=[];
    arr.push(addlist)
    jwt.verify(req.body.token,'1601E',(err,decoded)=>{
        if(err){
          res.json({
            code:0,
            msg:'失败'
          })
        }else{
          let newArr=[]
          arr.map((item,index)=>{
            item[decoded.username].map((val,ind)=>{
              if(val.name!=req.body.data.name){
                console.log(val)
                newArr.push(val)
              }
            })
            console.log(newArr)
           item[decoded.username]=newArr;
          })
          fs.writeFile(path.resolve(__dirname,'addrecip/addrecip.json'),JSON.stringify(addlist),(err)=>{
           //console.log(err)
            res.json({
              code:1,
              msg:"success"
            })
          })
        }
    })
  })
  //上传图片/文件/视频
  app.post('/api/upload',upload.single('img'),(req,res)=>{
    // console.log(req.file)
    res.json({
      code:0,
      msg:'success',
      url:'/static/imgs/'+req.file.filename
    })
  })
}

