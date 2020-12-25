import { getFakeBackendJSONUsers, getFakeBackendJSONDashboardData } from '../_helpers';
import moment from 'moment';



export function configureFakeBackend() {
    
    //let users = [{ id: 1, username: 'test@test.com', password: 'test', firstName: 'Test', lastName: 'User' }];
    let users = getFakeBackendJSONUsers();
    let realFetch = window.fetch;
    
    window.fetch = function (url, opts) {
        //const isLoggedIn = opts.headers['Authorization'] === 'Bearer fake-jwt-token';
        const isLoggedIn = true;

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.username === params.username && x.password === params.password);
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    });
                }

                // get users - secure
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(users);
                }

                // get dashboard - secure
                if (url.endsWith('/dashboard') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    const params = JSON.parse(opts.body);
                    const isStartUTCWithZValid = moment(params.startUTCTimeWithZ, moment.ISO_8601).isValid(); 
                    if (!isStartUTCWithZValid) return error('Start UTC Date is invalid: ' + params.startUTCTimeWithZ +  ' Format should look like "2016-10-13T08:35:47.510Z" ');
                    const isEndUTCWithZValid = moment(params.endUTCTimeWithZ, moment.ISO_8601).isValid(); 
                    if (!isEndUTCWithZValid) return error('End UTC Date is invalid:  ' + params.endUTCTimeWithZ +  '  Format should look like "2016-10-13T08:35:47.510Z" ');
                    let dashboardData = getFakeBackendJSONDashboardData(params.startUTCTimeWithZ, params.endUTCTimeWithZ);
                    //let dashboardData = getFakeBackendJSONDashboardData();
                    return ok(dashboardData);
                }

                // get dashboard - secure
                if (url.endsWith('/GetEvents/') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    const params = JSON.parse(opts.body);
                    const isStartUTCWithZValid = moment(params.startUTCTimeWithZ, moment.ISO_8601).isValid(); 
                    if (!isStartUTCWithZValid) return error('Start UTC Date is invalid: ' + params.startUTCTimeWithZ +  ' Format should look like "2016-10-13T08:35:47.510Z" ');
                    const isEndUTCWithZValid = moment(params.endUTCTimeWithZ, moment.ISO_8601).isValid(); 
                    if (!isEndUTCWithZValid) return error('End UTC Date is invalid:  ' + params.endUTCTimeWithZ +  '  Format should look like "2016-10-13T08:35:47.510Z" ');
                    //let dashboardData = getFakeBackendJSONDashboardData(params.startUTCTimeWithZ, params.endUTCTimeWithZ);
                    //let dashboardData = getFakeBackendJSONDashboardData();
                    console.log('test');
                    return ok();
                    //resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(dashboardData)) })
                    //return ok(dashboardData);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}