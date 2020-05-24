import * as types from './actionType'

const initialState = {
    listExams: [],
    listExamTimeTable: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_EXAMS:
        return Object.assign({}, state, {
          listExams: action.data
        })
      case types.LIST_EXAM_TIME_TABLE:
        return Object.assign({}, state, {
          listExamTimeTable: action.data
        })

        
      

      default:
        return state
    }
  }