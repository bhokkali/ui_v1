import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService, putService, postService } from '../../service/service'

export function createUpdateTeacher(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.teachers.createUpdateTeacher, payload)
    .then((resp) => {
      dispatch(getSchoolTeachers(payload.school_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolTeachers(school_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.teachers.getSchoolTeachers+"/"+school_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SCHOOL_TEACHERS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSubjectTeachers(school_id, subject_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.teachers.getSubjectTeachers+"?school_id="+school_id+"&subject_id="+subject_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SUBJECT_TEACHERS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch({ data: [], type: types.LIST_SUBJECT_TEACHERS })
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function checkAvailability(payload, entity) {
  return dispatch => {
    return postService(config.teachers.checkAvailabilityTeacher+"/"+entity, payload)
    .then((resp) => {
      dispatch({ data: resp, entity: entity, type: types.AVAILABLE_LIST_TEACHER })
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}





