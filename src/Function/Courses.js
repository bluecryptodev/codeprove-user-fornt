import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const course_get = data => {
    return axios
    .get((server+'course/course_get/'+data.id), {
    })
    .then(res => {
        return res.data;
    });
}

export const course_update = data => {
    return axios
    .post((server+'course/course_update/'+data.id), data)
    .then(res => {
        return res.data;
    });
}

export const json_file_read = data => {
    return axios
    .get((server+'course/json_file_read/'+data.filename), {
    })
    .then(res => {
        return res.data;
    });
}

export const comment_add = data => {
    return axios
    .post((server+"course/course_comment_add"), {
        id: data.id,
        data: data.data
    })
    .then(res => {
        return res.data
    })
}