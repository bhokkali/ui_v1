import axios from 'axios'
import config from '../config/apiConfig'

export function getService (serviceName) {
    const getUrl = config.commonPath + serviceName
    return axios.get(getUrl)
        .then(resp => {
            return resp.data
        })
}

export function postService (serviceName, payload) {
    const postUrl = config.commonPath + serviceName
    return axios.post(postUrl, payload)
        .then(resp => { 
            return resp.data
        })
}

export function putService (serviceName, payload) {
    const postUrl = config.commonPath + serviceName
    return axios.put(postUrl, payload)
        .then(resp => {
            return resp.data
        })
}

export function deleteService (serviceName) {
    return axios.delete(serviceName)
        .then(resp => {
            return resp.data
        })
}



export function fileUploadPostService(serviceName, fileInfo, payload) {
    const postUrl = config.commonPath + serviceName +"?cgn_id="+payload.cgn_id+"&role_id="+payload.role_id
    const formData = new FormData()
    const fileExtnArr = fileInfo.name.split('.')
    const fileExtn = fileExtnArr[fileExtnArr.length-1]
    formData.append(
        'files',
        fileInfo,
        payload.cgn_id+'_'+payload.role_id+'_'+payload.bank_info.Type+'.'+fileExtn
    )
    Object.keys(payload.bank_info).map((opt) => {
        formData.append(
            opt,
            payload.bank_info[opt]
        )
    })
    const configHeader = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    return axios.post(postUrl, formData, configHeader)
        .then(resp => {
            return resp.data
        }) 
}

export function getServiceSMS(serviceName, mobile_no, message) {
    const getUrl = config.sms.smsCommonPath + serviceName +"?apikey="+config.sms.apiKey+"&numbers="+mobile_no+"&sender="+config.sms.senderId+"&message="+message
    return axios.get(getUrl)
        .then(resp => {
            return resp.data
        })
}

