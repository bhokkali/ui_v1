import * as types from './actionType'

const initialState = {
    adminSchoolsList: [],
    adminGradesList: [],
    adminSubjectsList: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.ADMIN_LIST_SCHOOLS:
        return Object.assign({}, state, {
          adminSchoolsList: action.data
        })
      case types.ADMIN_LIST_GRADES:
        return Object.assign({}, state, {
          adminGradesList: action.data
        })
      case types.ADMIN_LIST_SUBJECTS:
        return Object.assign({}, state, {
          adminSubjectsList: action.data
        })        

      default:
        return state
    }
  }