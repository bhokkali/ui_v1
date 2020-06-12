import * as types from './actionType'
import config from '../../config/apiConfig'
import { postService, putService } from '../../service/service'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage } from '../Snackbars/actionCreator'

export function submitLogin(payload, academic_year_id, param) {
  let authUrl = config.auth.schoolLogin+"/"+academic_year_id
  let loginAs = 'School'
  /*if(param === "admin") {
    authUrl = config.auth.adminLogin
    loginAs = "Admin"
  } */

  if(payload.login_name.split("-").length === 2) {
    authUrl = config.auth.subadminLogin+"/"+academic_year_id
    loginAs = "SubAdmin"
  } else if(payload.login_name === 'admin') {
    authUrl = config.auth.adminLogin
    loginAs = "Admin"
  } else {
    authUrl = config.auth.schoolLogin+"/"+academic_year_id
    loginAs = "School"
  }
   
  return dispatch => {
    return postService(authUrl, payload)
    .then((resp) => {
      
      if(loginAs === "SubAdmin") {
        resp.schoolDto.loginAs = loginAs
        dispatch({ data: resp.schoolDto, type: types.LOGIN_SUCCESS })
        dispatch({ data: resp, type: types.LOGIN_SUBADMIN_SUCCESS })
      } else {
        resp.loginAs = loginAs
        dispatch({ data: resp, type: types.LOGIN_SUCCESS })
      }
      
      dispatch(toggleSnackBarSuccessMessage('successfully logged in', "snackbar"))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
    }) 
  }
}

export function forgotPassword(payload, send_to) {
  return dispatch => {
    return postService(config.auth.forgot_password, payload)
    .then((resp) => {
      dispatch({ data: resp, type: types.FORGOT_SUCCESS })
      dispatch(toggleSnackBarSuccessMessage('Password has been sent to your '+send_to, "dialog"))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error.response.data.message))
    })
  }
}

export function userLogout() {
  return { data: {}, type: types.USER_LOGOUT }
}

export function getAuthInfo (payload) {
  return { data: payload, type: types.GET_AUTH_INFO }
}

export function getSubadminInfo (payload) {
  return { data: payload, type: types.GET_SUBADMIN_INFO }
}

export function updateAuthInfo (payload) {
  return { data: payload, type: types.UPDATE_AUTH_INFO }
}

export function removeAuthInfo () {
  return { data: {}, type: types.REMOVE_AUTH_INFO }
}

export function changeLoginSuccessStatus (status) {
  return { data: status, type: types.CHANGE_LOGIN_SUCCESS_STATUS }
}
