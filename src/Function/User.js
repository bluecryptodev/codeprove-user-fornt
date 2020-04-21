import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const email_confirm = data => {
    return axios
    .post((server+'user/email_check'), {
        email: data.email
    })
    .then(res => {
        return res.data;
    });
}
export const user_add = data => {
    return axios
    .post((server+'user/signup'), {
        email: data.email,
        username: data.name,
        phone: data.phone,
        token: data.password,
        secret: data.secret,
        google_id: data.google_id,
        img: data.img
    })
    .then(res => {
        return res.data;
    })
}
export const social_signup = data => {
    return axios
    .post((server+'user/social-signup'), {
        email: data.email,
        username: data.name,
        phone: data.phone,
        token: data.password,
        secret: data.secret,
        google_id: data.google_id,
        img: data.img
    })
    .then(res => {
        return res.data;
    })
}
export const user_login = data => {
    return axios
    .post((server+'user/login'), {
        email: data.email,
        token: data.token,
        secret: data.secret
    })
    .then(res => {
        return res.data;
    })
}

export const user_get = data => {
    return axios
    .post((server+'user/userget'), {
        id: data.id
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    )
    .then(res => {
        return res.data
    })
}
export const all_user_get = data => {
    return axios
    .post((server+'user/all_userget'), {
        id: data.id
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    )
    .then(res => {
        return res.data
    })
}
export const user_update = data => {
    return axios
    .post((server+'user/update'), data)
    .then(res => {
        return res.data
    })
}
export const custome_update = data => {
    return axios
    .post((server+'user/custome_update/'+data.id), data)
    .then(res => {
        return res.data
    })
}
export const user_delete = data => {
    return axios
    .post((server+'user/userdelete'), {
        email: data.email
    })
    .then(res => {
        return res.data;
    })
}
export const phon_number_verify = data => {
    return axios
    .post((server+'user/phon_number_verify'), {
        to: data.number,
        code: data.code
    })
    .then(res => {
        return res.data;
    })
}
export const logout = data => {
    return axios
    .post((server+'user/logout'), {
        id: data.id,
    })
    .then(res => {
        return res.data;
    })
}
