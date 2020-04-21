import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const codereivew = data => {
    return axios
    .post((server+'codereview/run'), data)
    .then(res => {
        return res.data;
    });
}