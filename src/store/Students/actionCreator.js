import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService, putService, postService } from '../../service/service'

export function createUpdateStudent(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.students.createUpdateStudent, payload)
    .then((resp) => {
      dispatch(getSchoolStudents(payload.student_info.school_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolStudents(school_id, page, limit) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.students.getSchoolStudents+"?school_id="+school_id+"&page="+page+"&per_page="+limit)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SCHOOL_STUDENTS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getAcademicStudents(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    dispatch({ data: [], type: types.LIST_ACADEMIC_GRADE_STUDENTS })
    return getService(config.students.listAcademicStudents
      +"?school_id="+payload.school_id
      +"&academic_year_id="+payload.academic_year_id
      +"&school_grade_id="+payload.school_grade_id
    )
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_ACADEMIC_GRADE_STUDENTS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      console.log(error)
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}


export function submitMarks(payload, exam_id, school_grade_id, mode, studentsList) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.students.createUpdateExamMarks, payload)
    .then((resp) => {
      dispatch(getExamGradeMarks(exam_id, school_grade_id))
      if(mode === 'Report') {
        let sendArray = []
        studentsList.map((studentId) => {
          const sendData = {
              student_id: studentId,
              exam_id: exam_id,
              school_grade_id: school_grade_id
          }
          sendArray.push(sendData)
        })
        dispatch(createUpdateExamReport(sendArray, exam_id, school_grade_id))
      } else {
        dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
        dispatch(toggleLoader(false))
      }
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}


export function getExamGradeMarks(exam_id, school_grade_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    dispatch({ data: [], type: types.LIST_EXAM_GRADE_MARKS })
    return getService(config.students.listExamGradeMarks
      +"?exam_id="+exam_id
      +"&school_grade_id="+school_grade_id
    )
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_EXAM_GRADE_MARKS })
      dispatch({ data: true, type: types.MARKS_UPDATED_STATUS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function removeMarkUpdatedStatus() {
  return dispatch => {
    dispatch({ data: false, type: types.MARKS_UPDATED_STATUS })
  }
}

export function getExamReports(exam_id, school_grade_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    dispatch({ data: [], type: types.LIST_EXAM_REPORTS })
    return getService(config.students.listExamReports
      +"?exam_id="+exam_id
      +"&school_grade_id="+school_grade_id
    )
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_EXAM_REPORTS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      console.log(error)
      //dispatch(toggleSnackBarFailureMessage(error.response.data.message, "snackbar"))
      dispatch(toggleSnackBarFailureMessage("error while fetching report data", "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function createUpdateExamReport(payload, exam_id, school_grade_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.students.createUpdateExamReport, payload)
    .then((resp) => {
      dispatch(getExamGradeMarks(exam_id, school_grade_id))
      dispatch(getExamReports(exam_id, school_grade_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      console.log(error)
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}


export function getAcademicStudentsAttendance(school_grade_id, absent_date) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.students.listStudentGradeAttendance
      +"?school_grade_id="+school_grade_id
      +"&absent_date="+absent_date
    )
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_STUDENTS_ATTENDANCE })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      console.log(error)
      //dispatch(toggleSnackBarFailureMessage(error.response.data.message, "snackbar"))
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function createUpdateStudentAttendance(payload, school_grade_id, absent_date) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.students.createUpdateStudentAttendance+"?school_grade_id="+school_grade_id, payload)
    .then((resp) => {
      dispatch(getAcademicStudentsAttendance(school_grade_id, absent_date))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getAllExamReports(academic_year_id, school_grade_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.students.listAllExamReports
      +"?academic_year_id="+academic_year_id
      +"&school_grade_id="+school_grade_id
    )
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_ALL_EXAM_REPORTS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      console.log(error)
      //dispatch(toggleSnackBarFailureMessage(error.response.data.message, "snackbar"))
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function updateAcademicPromotion(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return postService(config.students.updateAcademicPromotion, payload)
    .then((resp) => {
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}


export function getStudentAttendanceCalendar(school_grade_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.students.listStudentAttendanceCalendar
      +"?school_grade_id="+school_grade_id
    )
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_STUDENTS_ATTENDANCE_CALENDAR })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}















