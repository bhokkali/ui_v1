import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService } from '../../service/service'
import { getSchoolGradesListNextYear } from '../SchoolGrades/actionCreator'

export function getGradesMaster() {
  return dispatch => {
    return getService(config.masters.list_grades_master)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_GRADES_MASTER })
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage("Issue while fetching grades", "snackbar"))
    })
  }
}

export function getAcademicYearsMaster() {
  return dispatch => {
    return getService(config.masters.list_academic_years)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_ACADEMIC_YEAR_MASTER })
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage("Issue while fetching academic years", "snackbar"))
    })
  }
}

export function getSchoolTeachersMaster(schoolId) {
  return dispatch => {
    return getService(config.masters.list_school_teachers+"/"+schoolId)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SCHOOL_TEACHERS_MASTER })
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage("Issue while fetching school teachers", "snackbar"))
    })
  }
}

export function getSubjectsMaster() {
  return dispatch => {
    return getService(config.masters.list_subjects)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SUBJECTS_MASTER })
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage("Issue while fetching school teachers", "snackbar"))
    })
  }
}

export function getAcademicYearInfoFromYearString(school_id, academic_year) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.masters.getAcademicYearInfoFromYearString+"?academic_year="+academic_year)
    .then((resp) => {
      dispatch(getSchoolGradesListNextYear(school_id, resp.id))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

