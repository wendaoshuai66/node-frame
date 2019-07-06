import path from 'path';
import lodash from 'lodash';
const config = {
    "viewDir": path.join(__dirname, '..', 'views'),
    "stcticDir": path.join(__dirname, '..', 'assets')
}


if (process.env.NODE_ENV == 'development') {
    const localConfig = {
        "baseUrl": "http://localhost:80/phpyii/basic/web/index.php?r=",
        "port": 8081
    }
    lodash.extend(config, localConfig)
}
if (process.env.NODE_ENV == 'production') {
    const proConfig = {
        "port": 8088
    }
    lodash.extend(config, proConfig)
}

export default config;