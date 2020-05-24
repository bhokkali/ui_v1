import * as types from './actionType'

const initialState = {
    listSchoolTeachers: [],
    subjectTeachers: [],
    availableListTeacher: {
      mobile_no: false,
      email: false,
      aadhar_no: false
    }
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_SCHOOL_TEACHERS:
        return Object.assign({}, state, {
          listSchoolTeachers: action.data
        })
      case types.LIST_SUBJECT_TEACHERS:
        return Object.assign({}, state, {
          subjectTeachers: action.data
        })
      case types.AVAILABLE_LIST_TEACHER:
        const updateData = state.availableListTeacher
        updateData[action.entity] = action.data
        return Object.assign({}, state, {
          availableListTeacher: updateData
        })  
        
      

      default:
        return state
    }
  }