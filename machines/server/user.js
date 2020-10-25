const {login, register, isAdmin, getUsersList} = require('./store.users');

let fakeEndpointCallCount = 0;

function initUserPart(router) {
  router.post('/login', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
    // set json header
    ctx.status = 200;
    ctx.body = login(ctx.request.body);
    return ctx;
  });

  router.post('/register', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
    // set json header
    ctx.status = 200;
    ctx.body = register(ctx.request.body);
    return ctx;
  });

  router.post('/is_admin', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
    // set json header
    ctx.status = 200;
    ctx.body = isAdmin(ctx.request.body);
    return ctx;
  })

  router.post('/create_new_user', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
    const {admin, user} = ctx.request.body;
    if(isAdmin(admin)) {
      ctx.body = register(user);
    } else {
      ctx.status = 403
      ctx.body = {error: 'Permission denied'}
    }
    return ctx;
  })

  router.post('/get_users', async (ctx) => {
    const {admin} = ctx.request.body;
    if(isAdmin(admin)) {
      ctx.body = getUsersList()
    } else {
      ctx.status = 403
      ctx.body = {error: 'Permission denied'}
    }
  })

  router.get('/fake_endpoint', async (ctx) => {
    if(fakeEndpointCallCount < 3) {
      ctx.status = 502
      ctx.body = 'Bad Gateway';
      fakeEndpointCallCount ++
    } else {
      ctx.status = 200
      ctx.body = {done: true};
    }
  })

  return router
}

module.exports = {
  initUserPart
}