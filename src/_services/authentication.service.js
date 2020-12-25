import { BehaviorSubject } from 'rxjs';

// CLF TODO - logout should log us out of all tabs. Might need Redux or something else? https://medium.com/front-end-weekly/multi-tab-logout-in-react-redux-4715f071c7fa
import { handleResponse } from '../_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    // CLF - we put API_ENDPOINT url in public/config.js and stored it in localstorage
    const apiUrl = JSON.parse(localStorage.getItem('config')).API_ENDPOINT;
    //const user1 = '{
     //   "username":"cletcherda@trustedoffice.com",
     //   "password":"Britain$1"
    //}'';
    //user1.username = 'cletcherda@trustedoffice.com';
    //user1.password = 'Britain$1';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: {user1},
        //body: JSON.stringify(user1)
        body: JSON.stringify({ username, password })
    };

    return fetch(`${apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes    
        // CLF - remove password from data security 
        user.password = null;
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);

        return user;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
