let jsonp=function(url,callbackName){
  return new Promise(function(resolve,reject){
    window[callbackName]=function(data){
      resolve(data)
    }
    let script=document.createElement('script');
    script.src=url;
    document.body.appendChild(script);
  })
}
export default jsonp
