import * as types from './actionType'

const initialState = {
    listSchoolParents: {},
    availableListParents: {
      mobile_no: false,
      email: false,
      aadhar_no: false
    },
    parentDetails: {}
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_SCHOOL_PARENTS:
        return Object.assign({}, state, {
          listSchoolParents: action.data
        })
      case types.AVAILABLE_LIST_PARENTS:
        const updateData = state.availableListParents
        updateData[action.entity] = action.data
        return Object.assign({}, state, {
          availableListParents: updateData
        })    
      case types.PARENT_DETAILS:
        return Object.assign({}, state, {
          parentDetails: action.data
        })   
        
      default:
        return state
    }
  }