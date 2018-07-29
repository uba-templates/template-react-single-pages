import axios from "axios";
import request from "utils/request";

const URL = {
    "GET_USER": "https://mock.yonyoucloud.com/mock/56/nc/api/user",
    "ADD_USER": "https://mock.yonyoucloud.com/mock/56/nc/api/adduser",
    "EDIT_USER": "https://mock.yonyoucloud.com/mock/56/nc/api/edituser",
    "DELETE_USER": "https://mock.yonyoucloud.com/mock/56/nc/api/delete"
}

export const get = () => {
    return request(URL.GET_USER, {
        method: "get"
    });
}

export const add = (user) => {
    return request(URL.ADD_USER, {
        method: "post",
        data: user
    });
}

export const edit = (user) => {
    return request(URL.EDIT_USER, {
        method: "post",
        data: user
    });
}

export const remove = (user) => {
    return request(URL.DELETE_USER, {
        method: "post",
        data: user
    });
}

