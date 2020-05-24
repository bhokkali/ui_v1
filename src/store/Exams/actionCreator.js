import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService, putService } from '../../service/service'

export function createUpdateExam(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.exams.createUpdateExam, payload)
    .then((resp) => {
      dispatch(getExamsList(payload.school_id, payload.academic_year_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getExamsList(school_id, academic_year_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.exams.getExamsList+"?school_id="+school_id+"&academic_year_id="+academic_year_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_EXAMS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getExamTimeTable(exam_id, school_grade_id) {
  console.log('ready to call')
  return dispatch => {
    dispatch(toggleLoader(true))
    dispatch({ data: [], type: types.LIST_EXAM_TIME_TABLE })
    return getService(config.exams.listGradeExams+"?exam_id="+exam_id+"&school_grade_id="+school_grade_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_EXAM_TIME_TABLE })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function createUpdateExamGrade(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.exams.createUpdateExamGrade, payload)
    .then((resp) => {
      dispatch(getExamTimeTable(payload.exam_id, payload.school_grade_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}



