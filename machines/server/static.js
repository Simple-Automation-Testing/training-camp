const fs = require('fs')
const path = require('path')

function getFiles(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(function(file) {
    const isDirectory = fs.statSync(path.join(dir, file)).isDirectory();
    if(isDirectory) {
      filelist = getFiles(path.join(dir, file), filelist);
    } else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist.filter((file) => !file.includes('html'));
}

const jsfiles = getFiles(path.resolve(__dirname, './dist')).filter(i => i.includes('.js'))
const cssfiles = getFiles(path.resolve(__dirname, './dist')).filter(i => i.includes('.css'))

function initStaticPart(router) {
  router.get('/', async (ctx) => {
    ctx.set('Content-Type', 'text/html; charset=utf-8')
    ctx.status = 200;
    const file = path.resolve(__dirname, './dist/index.html')
    ctx.body = fs.readFileSync(file).toString('utf8')

    return ctx;
  });

  router.get('/*.js', async (ctx) => {
    ctx.set('Content-Type', 'application/javascript')
    const reqPath = ctx.request.path
    const file = jsfiles.find(i => i.includes(reqPath))
    ctx.body = fs.readFileSync(file).toString('utf8')

    return ctx
  })

  router.get('/*.css', async (ctx) => {
    const reqPath = ctx.request.path
    ctx.set('Content-Type', 'text/css; charset=UTF-8')
    const file = cssfiles.find(i => i.includes(reqPath))
    ctx.body = fs.readFileSync(file).toString('utf8')

    return ctx
  })


  return router
}

module.exports = {
  initStaticPart
}