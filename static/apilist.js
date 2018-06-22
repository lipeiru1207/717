let fs=require('fs');
let path=require('path');
let jwt=require('jsonwebtoken');
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
    // let add=[];
    // login.forEach((item,index)=>{
    //   if(item.userename==username&&item.password==username){
    //     console.log(item)
    //     console.log(111)
    //   }
    // })
    if(login.some(item=>{
      // if(req.body.username==item.username){
      //   if(req.body.password==item.password){
      //     return req.body.username
      //   }
      //   return req.body.username
      // }
      // return req.body.username
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
}

