const {forwardTo} = require('prisma-binding')

const Query = {
    // async items(parent, args, ctx, info){
    //     return await ctx.db.query.items()
    // }
    items:forwardTo('db')
};

module.exports = Query;
