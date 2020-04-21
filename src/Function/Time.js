import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const now_time_get = data => {
    return axios
    .get((server+'now_time_get'), {
    })
    .then(res => {
        return res.data;
    });
}