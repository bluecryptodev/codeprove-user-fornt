import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const lecture_get = data => {
    return axios
    .get((server+'lecture/lecture_get/'+data.course+"/"+data.id), {
    })
    .then(res => {
        return res.data;
    });
}