// @ts-check
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const router = require('./router');

const routesList = router.stack.map(l => l.path)

const app = new Koa();

const {HOST = '0.0.0.0', PORT = 4000} = process.env;

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(async (ctx, next) => {
    await next()
    if(!routesList.includes(ctx.request.path)) {
      ctx.redirect('/')
    }
    return ctx
  })

app.listen(+PORT, HOST);
