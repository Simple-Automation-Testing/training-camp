const {addCombaine, removeCombaine, getCombaines, getCombainesCount} = require('./store.combaines');


function initCombainePart(router) {
  router.get('/get_combaines', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';

    console.log(ctx.request.query)
    // set json header
    ctx.status = 200;
    ctx.body = getCombaines(ctx.request.query);
    return ctx;
  });

  router.get('/get_combaines_count', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';

    console.log(ctx.request.query)
    // set json header
    ctx.status = 200;
    ctx.body = getCombainesCount();
    return ctx;
  });

  router.post('/remove_combaine', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';
    // set json header
    ctx.status = 200;
    ctx.body = removeCombaine(ctx.request.body);
    return ctx;
  });

  router.post('/add_machine', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';
    // set json header
    ctx.status = 200;
    ctx.body = addCombaine(ctx.request.body)
    return ctx;
  });

  return router
}

module.exports = {
  initCombainePart
}