const {addMachine, removeMachine, getMachines} = require('./store.machines');

function initMachinesPart(router) {
  router.get('/get_machines', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';
    // set json header
    const queries = ctx.request.queries
    ctx.status = 200;
    ctx.body = getMachines();
    return ctx;
  });

  router.post('/remove_machine', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';
    // set json header
    ctx.status = 200;
    ctx.body = removeMachine(ctx.request.body);
    return ctx;
  });

  router.post('/add_machine', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';
    // set json header
    ctx.status = 200;
    ctx.body = addMachine(ctx.request.body)
    return ctx;
  });

  return router
}

module.exports = {
  initMachinesPart
}