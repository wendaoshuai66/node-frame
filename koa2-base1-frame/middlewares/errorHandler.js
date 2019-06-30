const errorHandler={
    error(app,loger){
        app.use(async(ctx,next)=>{

            try{
                await next();
            }catch (error){
                loger.error(error)
                ctx.status = error.status || 500;
                ctx.body = '500错误';
            }
           
        })

        app.use(async(ctx,next)=>{
            await next();
            if(ctx.status !== 404){
                return;
            }
            ctx.status = 404;
            ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
        })
    }
}
    module.exports = errorHandler;