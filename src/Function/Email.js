import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const email_send = data => {
    return axios
    .post((server+'emailsend/OTP_send'), {
        password: data.password,
        email: data.email
    })
    .then(res => {
        return res.data;
    });
}
export const contact_send = data => {
    return axios
    .post((server+'emailsend/contact_send'), {
        subject: data.subject,
        message: data.message,
        email: data.user_mail
    })
    .then(res => {
        return res.data;
    });
}