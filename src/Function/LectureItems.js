import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const lectureitemget = data => {
    return axios
    .get((server+'lectureitem/itemget/'+data.id), {
    })
    .then(res => {
        return res.data;
    });
}
export const item_from_course = data => {
    return axios
    .get((server+'lectureitem/item_from_course/'+data.id), {
    })
    .then(res => {
        return res.data;
    });
}
export const bookmark_add = data => {
    return axios
    .post((server+'lectureitem/bookmark'), {
        id: data.id,
        bookmark_list: data.bookmark_list
    })
    .then(res => {
        return res.data
    })
}