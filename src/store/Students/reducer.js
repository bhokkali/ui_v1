import * as types from './actionType'

const initialState = {
    listSchoolStudents: [],
    listAcademicGradeStudents: [],
    listExamGradeMarks: [],
    listExamReports: [],
    listStudentsAttendance: [],
    listAllExamReports: [],
    listStudentAttendanceCalendar: [],
    marksUpatedStatus: false
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.LIST_SCHOOL_STUDENTS:
        return Object.assign({}, state, {
          listSchoolStudents: action.data
        })
      case types.LIST_ACADEMIC_GRADE_STUDENTS:
        return Object.assign({}, state, {
          listAcademicGradeStudents: action.data
        })
      case types.LIST_EXAM_GRADE_MARKS:
        return Object.assign({}, state, {
          listExamGradeMarks: action.data
        })
      case types.LIST_EXAM_REPORTS:
        return Object.assign({}, state, {
          listExamReports: action.data
        })
      case types.LIST_STUDENTS_ATTENDANCE:
        return Object.assign({}, state, {
          listStudentsAttendance: action.data
        })
      case types.LIST_ALL_EXAM_REPORTS:
        return Object.assign({}, state, {
          listAllExamReports: action.data
        })   
      case types.LIST_STUDENTS_ATTENDANCE_CALENDAR:
        return Object.assign({}, state, {
          listStudentAttendanceCalendar: action.data
        }) 
      case types.MARKS_UPDATED_STATUS:
        return Object.assign({}, state, {
          marksUpatedStatus: action.data
        })      
        
      default:
        return state
    }
  }