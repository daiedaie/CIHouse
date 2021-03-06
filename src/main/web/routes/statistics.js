'use strict'
const router = require('koa-router')()
const hbase = require('../hbase/hbase-server');

router
    .prefix('/statistics')
    .get('/', async (ctx, next) => {
        let data = {};
        if (ctx.queryString) {
            let query = ctx.query;

            //TODO
            //从HBASE中根据所需统计量搜索
        }
        await ctx.render('./statistics');
    })
    .get('/map',async (ctx,next)=>{
        let type='totalNum';
        if(ctx.querystring){
            type=ctx.query.type;
        }
        let data=await hbase.returnAreaInfo(type).then(data=>data);
        await ctx.render('./info/map',{title:'',mapdata:JSON.stringify(data.info)});
        // await ctx.render('./info/map');

    })
    .post('/map',async (ctx,next)=>{
        let type=ctx.request.body.type;
        ctx.body=await hbase.returnAreaInfo(type).then(data=>data.info);
    });
;

module.exports = router
