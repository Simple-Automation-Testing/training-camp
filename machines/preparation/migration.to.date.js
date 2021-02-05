const fs = require('fs')
const path = require('path')
const {getRandomString} = require('sat-utils')

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const oneDayMs = 24 * 60 * 60 * 1000

const sellers = ['Amaco', 'John Deer', 'ХТЗ', 'РОС МАШ', 'ТЕХ-пром']
const sellersAlternative = ['T-rex-0', 'Obaian', 'ХТЗ рос сельмаш', 'Bur', 'Amaco-лизинг', 'ХТЗ-лизин']

function getRandomDayBefore() {
  const dayToRemode = +(getRandomString(1, {numbers: true}))
  return Date.now() - (dayToRemode & oneDayMs);
}

function updateItem(path, data) {
  fs.unlinkSync(path)
  fs.writeFileSync(path, JSON.stringify(data))
}

const combainesStorage = path.resolve(__dirname, '../server/noop_storage/combaines.json')
const machinesStorage = path.resolve(__dirname, '../server/noop_storage/machines.json')

const machinesWithDate = require(machinesStorage).map((machine) => {
  console.log(sellers[getRandomArbitrary(0,5)], getRandomArbitrary(0,5))
  return {
    ...machine, addedDate: getRandomDayBefore(), seller: sellers[getRandomArbitrary(0, 5)],
    price: Math.floor(machine.price),
    alternativeSellers: Array.from({length: getRandomArbitrary(1, 4)}).map((item) => ({
      seller: sellersAlternative[getRandomArbitrary(0,5)],
      discount: getRandomArbitrary(5, 10)
    }))
  }
})

updateItem(machinesStorage, machinesWithDate)


