import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { putService, getService } from '../../service/service'
import { getAcademicYearsMaster } from '../Masters/actionCreator'

export function createUpdateAcademicYear(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.admin.createUpdateAcademicYear, payload)
    .then((resp) => {
      dispatch(getAcademicYearsMaster())
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function createUpdateSchool(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.admin.createUpdateSchool, payload)
    .then((resp) => {
      dispatch(getSchoolsList())
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolsList() {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.admin.listSchools)
    .then((resp) => {
      dispatch({ data: resp, type: types.ADMIN_LIST_SCHOOLS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function createUpdateGrade(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.admin.createUpdateGrade, payload)
    .then((resp) => {
      dispatch(getGradesList())
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getGradesList() {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.admin.listGrades)
    .then((resp) => {
      dispatch({ data: resp, type: types.ADMIN_LIST_GRADES })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function createUpdateSubject(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.admin.createUpdateSubject, payload)
    .then((resp) => {
      dispatch(getSubjectsList())
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSubjectsList() {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.admin.listSubjects)
    .then((resp) => {
      dispatch({ data: resp, type: types.ADMIN_LIST_SUBJECTS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}


export function createUpdatePermission(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.admin.createUpdatePermission, payload)
    .then((resp) => {
      dispatch(getPermissionsList())
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getPermissionsList() {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.admin.listPermissions)
    .then((resp) => {
      dispatch({ data: resp, type: types.ADMIN_LIST_PERMISSIONS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}





