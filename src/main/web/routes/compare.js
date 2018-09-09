'use strict'
const router = require('koa-router')()
//const hbase = require('hbase-server');

router
    .prefix('/compare')
    .param('ids', async (ids, ctx, next) => {
        let re = /^\d{6}-\d{6}$/;
        if (re.test(ids)) {
            let paras = ids.split('-');
            ctx.ids = paras;
            return next();
        }
        else
            return false;
    })
    .get('/:ids', async (ctx, next) => {
        //返回一个对象，{keys:[],values:[[]],x:[[]]}，分别代表表格键，表格值，图值
        //await hbase.get(ctx.id[0],ctx.id[1]).then(datas=>{}
        //companynames=datas.keys.slice(1)
        let data = {
            title:'企业信息对比',
            //chartData:{keys[0]:}
            keys:['-','com1','com2'],
            values:[['1','2','3'],['1','2','3'],['1','2','3']]
        };

        //chartdatas=companynames.map(each)
        await ctx.render('./info/compare',data);
    })

module.exports = router
