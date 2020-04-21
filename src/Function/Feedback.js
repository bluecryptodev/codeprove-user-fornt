import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;

export const feedback_add = data => {
    return axios
    .post((server+"feedback/add"), data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}