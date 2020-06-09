import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { putService, postService, getService } from '../../service/service'
import { updateAuthInfo } from '../Auth/actionCreator'

export function updateUserInfo(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.profile.update_school_info, payload)
    .then((resp) => {
      dispatch(updateAuthInfo(resp))
      dispatch(toggleSnackBarSuccessMessage("School details updated successfully", "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      /*const errMsg = {status: true, variant: 'error', message: 'Issue while update details'}
      dispatch({ snackMessage: errMsg, type: TOGGLE_SNACKBAR }) */
      console.log(error)
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function updatePassword(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return postService(config.profile.school_change_password, payload)
    .then((resp) => {
      dispatch(toggleSnackBarSuccessMessage("Passord changed successfully", "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      console.log(error)
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function createUpdateSubadmin(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.profile.createUpdateSubadmin, payload)
    .then((resp) => {
      dispatch(getSubadmins(payload.school_id))
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSubadmins(school_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.profile.listSubadmins+"?school_id="+school_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SUB_ADMINS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}


