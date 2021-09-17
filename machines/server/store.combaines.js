// @ts-check
// this is temp hardcoded data
const combaines = require('./noop_storage/combaines.json')

function getCombaines({offset = 0, limit = combaines.length - 1}) {
  const data = [...combaines].splice(+offset, +limit)
  return data
}

function addCombaine(machine) {
  combaines.push(machine)
  return combaines
}

function getCombainesCount() {
  return combaines.length
}

function removeCombaine(machine) {
  const index = combaines.findIndex((m) => {
    return Object.keys(machine).every(k => machine[k] === m[k])
  })
  if(index >= 0) {
    combaines.splice(index, 1)
  }
  return combaines
}

module.exports = {
  addCombaine,
  removeCombaine,
  getCombaines,
  getCombainesCount
}