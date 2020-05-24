import * as types from './actionType'
  
  export function toggleSnackBar (snackMessage) {
    return {
      type: types.TOGGLE_SNACKBAR,
      snackMessage,
    }
  }

  export function toggleLoader (loadStatus) {
    const loaderMsg = { status: loadStatus }
    return {
      type: types.TOGGLE_LOADER,
      loaderMsg,
    }
  }

  export function toggleSnackBarSuccessMessage (message, mode) {
    const succSnackbar = {status: true, variant: 'success', message, mode }
    return {
      type: types.TOGGLE_SNACKBAR,
      snackMessage: succSnackbar,
    }
  }

  export function toggleSnackBarFailureMessage (error, mode) {
    let message = (error.response && error.response.data) ? error.response.data.message : "API Issue, please contact admin."
    const failSnackbar = {status: true, variant: 'error', message, mode }
    return {
      type: types.TOGGLE_SNACKBAR,
      snackMessage: failSnackbar,
    }
  }
  
  