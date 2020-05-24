import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService, putService } from '../../service/service'

export function createUpdatePeriod(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.periods.createUpdatePeriod, payload)
    .then((resp) => {
      dispatch(getSchoolPeriods(payload.school_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolPeriods(school_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.periods.getSchoolPeriods+"/"+school_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SCHOOL_PERIODS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}



