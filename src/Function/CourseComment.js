import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;

export const comment_add = data => {
    return axios
    .post((server+"comment/add"), data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const comment_get = data => {
    return axios
    .get((server+"comment/comment_get/"+data.id),{})
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const comment_update = data => {
    return axios
    .post((server+"comment/comment_update/"+data.id), data.data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const comment_delete = data => {
    return axios
    .post((server+"comment/comment_delete"), data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const file_upload = data => {
    return axios
    .post((server+"comment/file_upload"), data.imgData)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}