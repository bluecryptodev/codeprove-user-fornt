import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const doubt_add = data => {
    return axios
    .post((server+'doubtchat/add'), {
        title: data.title,
        description: data.description,
        course_id: data.course_id,
        course_name: data.course_name,
        lecture_id: data.lecture_id,
        lectureitem_id: data.lectureitem_id,
        lectureitem_name: data.lectureitem_name,
        lectureitem_type: data.lectureitem_type,
        user_id: data.user_id,
        course_deadline: data.course_deadline,
        user_name: data.user_name
    })
    .then(res => {
        return res.data;
    })
}

export const doubte_get = data => {
    return axios
    .post((server+'doubtchat/doubte_get'), data)
    .then(res => {
        return res.data;
    })
}

export const doubte_update = data => {
    return axios
    .post((server+"doubtchat/doubte_update"), data)
    .then(res => {
        return res.data;
    })
}

export const message_delete = data => {
    return axios
    .post((server+'doubtchat/message_delete'), data)
    .then(res => {
        return res.data
    })
}
export const chat_file_upload = data => {
    return axios
    .post((server+'doubtchat/chat_file_upload'), data.file, {
        onUploadProgress: ProgressEvent => data.onProcessFuc(ProgressEvent)})
    .then(res => {
        return res.data
    })
}