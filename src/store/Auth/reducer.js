import * as types from './actionType'
import { setCookie, deleteCookie } from '../../components/Common/Utility/Utils'

const initialState = {
    authInfo: {},
    FpMessage: {},
    loginSuccessStatus: false
  }
  
  export default (state = initialState, action) => {
    const dt = new Date()
    switch (action.type) {
      case types.LOGIN_SUCCESS:
        const authInfo = {isAuth: true, data: action.data, expTime: dt }
        setCookie('login_name', action.data.login_name, 1)
        setCookie('school_id', action.data.id, 1)
        window.localStorage.setItem('AuthInfo', JSON.stringify(action.data))
        return Object.assign({}, state, {
          authInfo,
          loginSuccessStatus: true
        })

      case types.FORGOT_SUCCESS:
        return Object.assign({}, state, {
          FpMessage: action.data
        })
      
      case types.USER_LOGOUT:
      console.log('reducer called USER_LOGOUT')
        const authInfoFail = { isAuth: false }
        deleteCookie('login_name')
        deleteCookie('school_id')
        window.localStorage.removeItem('AuthInfo')
        return Object.assign({}, state, {
          authInfo: authInfoFail
        })
      
      case types.GET_AUTH_INFO:
        const authInfoReload = {isAuth: true, data: action.data, expTime: dt }
        window.localStorage.setItem('AuthInfo', JSON.stringify(action.data));
        return Object.assign({}, state, {
          authInfo: authInfoReload
        })
      
      case types.UPDATE_AUTH_INFO:
        const authInfoUpdated = {isAuth: true, data: action.data, expTime: dt }
        window.localStorage.setItem('AuthInfo', JSON.stringify(action.data));
        return Object.assign({}, state, {
          authInfo: authInfoUpdated
        })
      
      case types.REMOVE_AUTH_INFO:
        return Object.assign({}, state, {
          authInfo: {}
        })

      case types.CHANGE_LOGIN_SUCCESS_STATUS:
        return Object.assign({}, state, {
          loginSuccessStatus: action.data
        })

      default:
        return state
    }
  }