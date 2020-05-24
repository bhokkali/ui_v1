import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService, putService } from '../../service/service'

export function createUpdateCircular(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.circulars.createUpdateCircular, payload)
    .then((resp) => {
      dispatch(getSchoolCirculars(payload.school_id, payload.academic_year_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolCirculars(school_id, academic_year_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.circulars.listSchoolCirculars+"?school_id="+school_id+"&academic_year_id="+academic_year_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SCHOOL_CIRCULARS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}



