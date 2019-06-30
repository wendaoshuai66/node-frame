const config = require("../config")
const fetch = require('node-fetch')
class SafeRequest{
    constructor(url){
        this.url=url;
        this.baseurl= config.baseUrl;
    }
    fetchData(){
        return new Promise((reslove,reject)=>{
            
            let fetchRequest = fetch(this.baseurl+this.url);
            let result = {
                code:0,
                message:"",
                data:[]
            }
            // fetchRequest.then(res=>{
            //     res.json()
            // }).then(json=>{
            //     result.data = json;
            //     reslove(result)
            // }).cath(error=>{
                
            //     result.msg = "node-fetch 请求失败";
            //     reject(result)
            // })

            fetchRequest.then(res=>res.json())
                        .then(json=>{
                            result.code = 1,
                            result.message = 'ok',
                            result.data = json;
                            reslove(result);
                        })
                        //对接口的容错
                        .catch(error=>{
                            result.code = 1;
                            result.message = '与后端接口异常',
                            reject(result);
                        })

        }).catch(error=>{
            error
        })
    }
}

module.exports = SafeRequest;