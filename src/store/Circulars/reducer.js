import * as types from './actionType'

const initialState = {
  listSchoolCirculars: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_SCHOOL_CIRCULARS:
        return Object.assign({}, state, {
          listSchoolCirculars: action.data
        })
      

      default:
        return state
    }
  }