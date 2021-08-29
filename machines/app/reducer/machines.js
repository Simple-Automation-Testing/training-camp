const initialState = {
  sternMachines: [],
  filter: ''
}

const FILTER_NAME = 'FILTER_NAME'
const FILTER_VOLUME = 'FILTER_VOLUME'
const FILTER_PRICE = 'FILTER_PRICE'
const FILTER_DROP = 'FILTER_DROP'
const SORT_PRICE_LOW = 'SORT_PRICE_LOW'
const SORT_PRICE_HIGHT = 'SORT_PRICE_HIGHT'
const SORT_BRAND_Z_A = 'SORT_BRAND_Z_A'
const SORT_BRAND_A_Z = 'SORT_BRAND_A_Z'
const SORT_WORK_VOLUME_HIGHT = 'SORT_WORK_VOLUME_HIGHT'
const SORT_WORK_VOLUME_LOW = 'SORT_WORK_VOLUME_LOW'
const INIT_MACHINES = 'INIT_MACHINES'

export const filterName = ({value}) => ({type: FILTER_NAME, value})
export const filterVolume = ({value}) => ({type: FILTER_VOLUME, value})
export const filterPrice = ({value}) => ({type: FILTER_PRICE, value})
export const filterDrop = () => ({type: FILTER_DROP})
export const sortPriceFormLow = () => ({type: SORT_PRICE_LOW})
export const sortPriceFormHight = () => ({type: SORT_PRICE_HIGHT})

export const sortBrandAZ = () => ({type: SORT_BRAND_A_Z})
export const sortBrandZA = () => ({type: SORT_BRAND_Z_A})

export const sortWorkVolumeLow = () => ({type: SORT_WORK_VOLUME_LOW})
export const sortWorkVolumeHight = () => ({type: SORT_WORK_VOLUME_HIGHT})

export const initMachines = (sternMachines) => ({type: INIT_MACHINES, sternMachines})


export default (state = initialState, action) => {
  switch(action.type) {
    case INIT_MACHINES: {
      return {
        ...state,
        sternMachines: action.sternMachines
      }
    }
    case FILTER_NAME: {
      return {
        ...state, filter: action.value, sternMachines: state.sternMachines.filter(machine => {
          return machine.brand.includes(action.value)
        })
      }
    }
    case FILTER_PRICE:
      return {
        ...state, sternMachines: state.sternMachines.filter(machine => {
          return machine.price < +action.value
        })
      }
    case FILTER_VOLUME:
      return {
        ...state, sternMachines: state.sternMachines.filter(machine => {
          return machine.work_volume < +action.value
        })
      }
    case SORT_PRICE_HIGHT: {
      state.sternMachines = ((arr) => {
        const n = arr.length
        for(let i = 0; i < n - 1; i++) {
          for(let j = 0; j < n - 1 - i; j++) {
            if(+arr[j + 1].price < +arr[j].price) {
              const t = arr[j + 1]
              arr[j + 1] = arr[j]
              arr[j] = t;
            }
          }
        }
        return arr
      })(state.sternMachines)
      return {...state, sternMachines: state.sternMachines.map(a => a)}
    }
    case SORT_PRICE_LOW: {
      state.sternMachines = ((arr) => {
        const n = arr.length
        for(let i = 0; i < n - 1; i++) {
          for(let j = 0; j < n - 1 - i; j++) {
            if(+arr[j + 1].price > +arr[j].price) {
              const t = arr[j + 1]
              arr[j + 1] = arr[j]
              arr[j] = t;
            }
          }
        }
        return arr
      })(state.sternMachines)

      return {...state, sternMachines: state.sternMachines.map(a => a)}
    }
    case SORT_BRAND_A_Z: {
      const sternMachines = state.sternMachines.sort((itemOne, itemTwo) => {
        if(itemOne.brand.toLowerCase() < itemTwo.brand.toLowerCase()) {
          return -1
        } else if(itemOne.brand.toLowerCase() > itemTwo.brand.toLowerCase()) {
          return 1
        }
        return 0
      })
      return {...state, sternMachines}
    }
    case SORT_BRAND_Z_A: {
      const sternMachines = state.sternMachines.sort((itemOne, itemTwo) => {
        if(itemOne.brand.toLowerCase() < itemTwo.brand.toLowerCase()) {
          return 1
        } else if(itemOne.brand.toLowerCase() > itemTwo.brand.toLowerCase()) {
          return -1
        }
        return 0
      })
      return {...state, sternMachines}
    }

    case SORT_WORK_VOLUME_LOW: {
      const sternMachines = state.sternMachines.sort((itemOne, itemTwo) => {
        if(itemOne.work_volume > itemTwo.work_volume) {
          return 1
        } else if(itemOne.work_volume < itemTwo.work_volume) {
          return -1
        }
        return 0
      })
      return {...state, sternMachines}
    }
    case SORT_WORK_VOLUME_HIGHT: {
      const sternMachines = state.sternMachines.sort((itemOne, itemTwo) => {
        if(itemOne.work_volume < itemTwo.work_volume) {
          return 1
        } else if(itemOne.work_volume > itemTwo.work_volume) {
          return -1
        }
        return 0
      })
      return {...state, sternMachines}
    }
    case FILTER_DROP: {
      return {...initialState}
    }
    default:
      return state
  }
}