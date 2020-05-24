import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService, putService } from '../../service/service'

export function createUpdateSchoolGrade(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.schoolGrades.createUpdateSchoolGrade, payload)
    .then((resp) => {
      dispatch(getSchoolGradesList(payload.school_id, payload.academic_year_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolGradesList(school_id, academic_year_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.schoolGrades.listSchoolGrades+"?school_id="+school_id+"&academic_year_id="+academic_year_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SCHOOL_GRADES })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function createUpdateMarkGrade(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.schoolGrades.createUpdateMarkGrade, payload)
    .then((resp) => {
      dispatch(getMarkGradesList(payload.school_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getMarkGradesList(school_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.schoolGrades.listMarkGrades+"?school_id="+school_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_MARK_GRADES })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolGradesListNextYear(school_id, academic_year_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.schoolGrades.listSchoolGrades+"?school_id="+school_id+"&academic_year_id="+academic_year_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SCHOOL_GRADES_NEXT_YEAR })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}