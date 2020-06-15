import * as types from './actionType'
import { toggleSnackBarSuccessMessage, toggleSnackBarFailureMessage, toggleLoader } from '../Snackbars/actionCreator'
import config from '../../config/apiConfig'
import { getService, putService, postService } from '../../service/service'

export function createUpdateParent(payload) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return putService(config.parents.createUpdateParent, payload)
    .then((resp) => {
      dispatch(toggleSnackBarSuccessMessage(resp, "dialog"))
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error.response.data.message, "snackbar"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSchoolParents(school_id, page, limit) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.parents.getSchoolParents+"?school_id="+school_id+"&page="+page+"&per_page="+limit)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SCHOOL_PARENTS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function checkAvailability(payload, entity) {
  return dispatch => {
    return postService(config.parents.checkAvailabilityParents+"/"+entity, payload)
    .then((resp) => {
      dispatch({ data: resp, entity: entity, type: types.AVAILABLE_LIST_PARENTS })
    })
    .catch((error) => {
      console.log(error)
      dispatch(toggleSnackBarFailureMessage(error.response.data.message, "snackbar"))
    })
  }
}

export function getParentInfo(parent_id) {
  return dispatch => {
    dispatch(toggleLoader(true))
    return getService(config.parents.getParentInfo+"/"+parent_id)
    .then((resp) => {
      dispatch({ data: resp, type: types.PARENT_DETAILS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function getSearchParents(school_id, parent_name, status, page, limit) {
  return dispatch => {
    dispatch({ data: [], type: types.LIST_SEARCH_PARENTS })
    dispatch({ data: false, type: types.LIST_SEARCH_UPDATED_STATUS })
    dispatch(toggleLoader(true))
    return getService(config.parents.searchParents+"?school_id="+school_id+"&parent_name="+parent_name+"&status="+status+"&page="+page+"&per_page="+limit)
    .then((resp) => {
      dispatch({ data: resp, type: types.LIST_SEARCH_PARENTS })
      dispatch({ data: true, type: types.LIST_SEARCH_UPDATED_STATUS })
      dispatch(toggleLoader(false))
    })
    .catch((error) => {
      dispatch({ data: [], type: types.LIST_SEARCH_PARENTS })
      dispatch({ data: false, type: types.LIST_SEARCH_UPDATED_STATUS })
      dispatch(toggleSnackBarFailureMessage(error, "dialog"))
      dispatch(toggleLoader(false))
    })
  }
}

export function removeSearchUpdatedStatus() {
  return dispatch => {
    dispatch({ data: false, type: types.LIST_SEARCH_UPDATED_STATUS })
  }
}