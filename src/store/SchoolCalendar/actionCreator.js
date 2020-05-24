import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService, putService } from '../../service/service'

export function createUpdateSchoolCalendar(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.schoolCalendar.createUpdateCalendar, payload)
    .then((resp) => {
      dispatch(getSchoolCalendarList(payload.school_id, payload.academic_year_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolCalendarList(school_id, academic_year_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.schoolCalendar.getSchoolCalendar+"/"+school_id+"/"+academic_year_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SCHOOL_CALENDAR })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error.response.data.message, "snackbar"))
      dispatch(toggleLoader(false))
    })
  }
}