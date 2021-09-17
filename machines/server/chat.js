// @ts-check
const {addMessage, removeMessage, getMessages, startSession} = require('./store.chat');

function initMessagesPart(router) {
  router.get('/messages_start', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';
    // set json header
    ctx.status = 200;
    ctx.body = {sessionId: startSession()};
    return ctx;
  });

  router.post('/get_messages', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';
    // set json header
    ctx.status = 200;
    console.log(ctx.request.body)
    ctx.body = getMessages(ctx.request.body);
    return ctx;
  });

  router.post('/remove_message', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';
    // set json header
    ctx.status = 200;
    ctx.body = removeMessage(ctx.request.body);
    return ctx;
  });

  router.post('/add_message', async (ctx) => {
    ctx.header['Content-Type'] = 'application/json';
    // set json header
    ctx.status = 200;
    ctx.body = addMessage(ctx.request.body)
    return ctx;
  });

  return router
}

module.exports = {
  initMessagesPart
}