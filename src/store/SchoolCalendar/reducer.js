import * as types from './actionType'

const initialState = {
  schoolCalendarList: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_SCHOOL_CALENDAR:
        return Object.assign({}, state, {
          schoolCalendarList: action.data
        })
        
      default:
        return state
    }
  }