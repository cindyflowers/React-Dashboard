
import { authHeader, handleResponse } from '../_helpers';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };

    // CLF - we put API_ENDPOINT url in public/config.js and stored it in localstorage
    const apiUrl = JSON.parse(localStorage.getItem('config')).API_ENDPOINT;
    return fetch(`${apiUrl}/UsersController`, requestOptions).then(handleResponse);
}