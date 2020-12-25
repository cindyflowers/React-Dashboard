import users from './fakedata/DashboardDataUsers'
import admin3 from './fakedata/DashboardDataAdmin'
import requests from './fakedata/DashboardDataActionDRMViewRequestFailed'
import userPassword from './fakedata/DashboardDataStateViolatePasswordUser'
import password from './fakedata/DashboardDataLinkSharePasswordViolated'
import failures from "./fakedata/DashboardDataFailures"
import failureTypes from "./fakedata/DashboardDataFailureTypes"

export function getFakeBackendJSONDashboardData (startUTCWithZ, endUTCWithZ) {
const apiUrl = JSON.parse(localStorage.getItem('config')).API_ENDPOINT;
let admin;
let result;
// let result = function(){
// let promiseArray = [];
// promiseArray.push(fetch('http://localhost:4000/GetEventsAll'));
// promiseArray.push(fetch('http://localhost:4000/GetEventsAll'));
// promiseArray.push(fetch('http://localhost:4000/GetEventsAll'));
// promiseArray.push(fetch('http://localhost:4000/GetEventsAll'));
// promiseArray.push(fetch('http://localhost:4000/GetEventsAll'));
// promiseArray.push(fetch('http://localhost:4000/GetEventsAll'));
// promiseArray.push(fetch('http://localhost:4000/GetEventsAll'));
// return Promise.all(promiseArray);
// }

// var promise1 = Promise.resolve(fetch('http://localhost:4000/GetEventsAll'));
// var promise2 = 42;
// var promise3 = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise1, promise2, promise3]).then(function(values) {
//   console.log(values);
// });

// const fetchPromise = fetch("http://localhost:4000/GetEventsAll");
// fetchPromise.then(response => {
//   return response.json();
// }).then(Admin => {
//   console.log(Admin);
// });
var promise1 = Promise.resolve(users);
var promise2 = Promise.resolve(password);
var promise3 = Promise.resolve(requests);
var promise4 = Promise.resolve(userPassword);
var promise5 = Promise.resolve(failureTypes);
var promise6 = Promise.resolve(failures);
var promise7 = fetch("http://localhost:4000/GetEventsAll");
promise7.then(response => {
   return response.json();
 }).then(Admin => {
   console.log(Admin);
   //return Admin;
 });

Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7]).then(function(values) {
  //result = { ...users, ...password, ...requests, ...userPassword, ...failureTypes, ...failures, ...promise7 };
  console.log(values);
  result = values;
  console.log(result);
});

var apiRequest1 = fetch('http://localhost:4000/GetEvents/:1').then(function(response){ 
   return response.json()
});
var apiRequest2 = fetch('http://localhost:4000/GetEvents/:2').then(function(response){
   return response.json()
});
var combinedData = {"apiRequest1":{},"apiRequest2":{}};
Promise.all([apiRequest1,apiRequest2]).then(function(values){
combinedData["apiRequest1"] = values[0];
combinedData["apiRequest2"] = values[1];
console.log(combinedData);
return combinedData;
});
   //let result = { ...users, ...password, ...requests, ...userPassword, ...failureTypes, ...failures, ...admin };
   //let result = {...docTypes, ...users, ...failureTypes, ...failures, ...FakeAdmin, ...FakePassword, ...FakeRequests, ...FakeUser };
   //console.log(result);
   return result;
}
