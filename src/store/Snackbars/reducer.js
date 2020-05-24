import * as types from './actionType'

export const initialState = {
  snackbarMessage: {},
  loaderStatus: {
    status: false
  }
}

export default function snackbarReducer (state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_SNACKBAR:
      return Object.assign({}, state, {
        snackbarMessage: action.snackMessage
      })

    case types.TOGGLE_LOADER:
      return Object.assign({}, state, {
        loaderStatus: action.loaderMsg
      })

    default:
      return state
  }
}
