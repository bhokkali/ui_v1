import * as types from './actionType'

const initialState = {
    listTeacherAttendance: [],
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_TEACHER_ATTENDANCE:
        return Object.assign({}, state, {
          listTeacherAttendance: action.data
        })
      

      default:
        return state
    }
  }