import * as types from './actionType'

const initialState = {
  listTimeTable: [],
  listGradeTimeTable: [],
  listTeacherTimeTable: [],
  listActiveSubjects: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_SCHOOL_TIMETABLE:
        return Object.assign({}, state, {
          listTimeTable: action.data
        })
      case types.LIST_GRADE_TIMETABLE:
        return Object.assign({}, state, {
          listGradeTimeTable: action.data
        })
      case types.LIST_TEACHER_TIMETABLE:
        return Object.assign({}, state, {
          listTeacherTimeTable: action.data
        })
      case types.LIST_ACTIVE_SUBJECTS:
        return Object.assign({}, state, {
          listActiveSubjects: action.data
        })
        
        
      

      default:
        return state
    }
  }