import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService, putService } from '../../service/service'

export function addTeacherAttendance(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.teacherAttendance.addTeacherAttendance, payload)
    .then((resp) => {
      dispatch(getTeacherAttendance(payload.school_id, payload.academic_year_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getTeacherAttendance(school_id, academic_year_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.teacherAttendance.getTeacherAttendance+"/"+school_id+"/"+academic_year_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_TEACHER_ATTENDANCE })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}





