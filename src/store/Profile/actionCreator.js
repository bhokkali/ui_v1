// import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { putService, postService } from '../../service/service'
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
