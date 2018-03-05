import axios from "axios";

export default (url, options) => {
    return axios({
        method: options.method,
        url: url,
        data: options.data,
        params: options.param
    });
}