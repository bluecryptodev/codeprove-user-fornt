import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const supportchat_add = data => {
    return axios
    .post((server+'supportchat/add'), {
        email: data.email,
        phone: data.phone,
        username: data.username
    })
    .then(res => {
        return res.data;
    })
}
export const support_chat_get = data => {
    return axios
    .post((server+'supportchat/support_chat_get'), data)
    .then(res => {
        return res.data;
    })
}
export const message_delete = data => {
    return axios
    .post((server+'supportchat/message_delete'), data)
    .then(res => {
        return res.data
    })
}
export const chat_file_upload = data => {
    return axios
    .post((server+'supportchat/chat_file_upload'), data.file, {
        onUploadProgress: ProgressEvent => data.onProcessFuc(ProgressEvent)})
    .then(res => {
        return res.data
    })
}
