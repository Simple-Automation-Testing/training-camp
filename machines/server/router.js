const Router = require('koa-router');
const {initMachinesPart} = require('./machine');
const {initCombainePart} = require('./combaine');
const {initUserPart} = require('./user');
const {initStaticPart} = require('./static');

function applyMiddlewars(r, ...midd) {
  midd.forEach(m => m(r))
  return r
}

const router = applyMiddlewars(new Router(),
  initUserPart,
  initMachinesPart,
  initStaticPart,
  initCombainePart
)

module.exports = router;
