import * as types from './actionType'

const initialState = {
    listGradesMaster: [],
    academicYearMaster: [],
    schoolTeachersMaster: [],
    subjectsMaster: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_GRADES_MASTER:
        return Object.assign({}, state, {
          listGradesMaster: action.data
        })

      case types.LIST_ACADEMIC_YEAR_MASTER:
        return Object.assign({}, state, {
          academicYearMaster: action.data
        })

      case types.LIST_SCHOOL_TEACHERS_MASTER:
        return Object.assign({}, state, {
          schoolTeachersMaster: action.data
        })

      case types.LIST_SUBJECTS_MASTER:
        return Object.assign({}, state, {
          subjectsMaster: action.data
        })

      default:
        return state
    }
  }