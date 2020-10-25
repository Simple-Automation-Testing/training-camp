// this is temp hardcoded data
const sternMachines = require('./noop_storage/machines.json')

function getMachines(offset = 0, limit = sternMachines.length - 1) {
  return [...sternMachines].splice(offset, limit)
}

function addMachine(machine) {
  sternMachines.push(machine)
  return sternMachines
}

function removeMachine(machine) {
  const index = sternMachines.findIndex((m) => {
    return Object.keys(machine).every(k => machine[k] === m[k])
  })
  if(index >= 0) {
    sternMachines.splice(index, 1)
  }
  return sternMachines
}

module.exports = {
  addMachine,
  removeMachine,
  getMachines
}