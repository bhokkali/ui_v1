import * as types from './actionType'

const initialState = {
    listSubadmins: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_SUB_ADMINS:
        return Object.assign({}, state, {
          listSubadmins: action.data
        })
      

      default:
        return state
    }
  }