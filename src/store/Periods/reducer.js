import * as types from './actionType'

const initialState = {
    listSchoolPeriods: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_SCHOOL_PERIODS:
        return Object.assign({}, state, {
          listSchoolPeriods: action.data
        })
      

      default:
        return state
    }
  }