import * as types from './actionType'

const initialState = {
    schoolGradesList: [],
    schoolMarkGradesList: [],
    nextAcademicGrades: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_SCHOOL_GRADES:
        return Object.assign({}, state, {
          schoolGradesList: action.data
        })
      case types.LIST_MARK_GRADES:
        return Object.assign({}, state, {
          schoolMarkGradesList: action.data
        })
      case types.LIST_SCHOOL_GRADES_NEXT_YEAR:
        return Object.assign({}, state, {
          nextAcademicGrades: action.data
        })
        
        
      default:
        return state
    }
  }