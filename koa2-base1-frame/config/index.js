const {join} = require('path');
const {extend} = require('lodash')
const config = {
    "viewDir":join(__dirname,'..','views'),
    "stcticDir":join(__dirname,'..','assets')
}


if(process.env.NODE_ENV == 'development'){
    const localConfig = {
       "baseUrl":"http://localhost:80/phpyii/basic/web/index.php?r=",
        "port":8081
    }
    extend(config,localConfig)
}
if(process.env.NODE_ENV == 'production'){
    const proConfig = {
        "port":80
    }
    extend(config,proConfig)
}

module.exports = config;
