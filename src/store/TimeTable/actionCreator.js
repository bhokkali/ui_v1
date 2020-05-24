import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService, putService, postService } from '../../service/service'

export function createUpdateTimeTable(payload, gradeInfo) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.timetable.createUpdateTimeTable, payload)
    .then((resp) => {
      dispatch(getSchoolTimeTable(payload.school_id, payload.academic_year_id))
      dispatch(getGradeTimeTable(gradeInfo))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolTimeTable(school_id, academic_year_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.timetable.getSchoolTimeTable+"/"+school_id+"/"+academic_year_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SCHOOL_TIMETABLE })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getGradeTimeTable(gradeInfo) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return postService(config.timetable.getGradeTimeTable, gradeInfo)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_GRADE_TIMETABLE })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      console.log(error)
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getTeacherTimeTable(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.timetable.getTeacherTimeTable+"?school_id="+payload.school_id+"&academic_year_id="+payload.academic_year_id+"&teacher_id="+payload.teacher_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_TEACHER_TIMETABLE })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      console.log(error)
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolActiveSubjects(school_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.timetable.listSchoolActiveSubjects+"?school_id="+school_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_ACTIVE_SUBJECTS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      console.log(error)
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}









