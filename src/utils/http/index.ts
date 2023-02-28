import axios from 'axios';

function createAxios(option = {}) {
    return axios.create(option);
}

export const http = createAxios();
