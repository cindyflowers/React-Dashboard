
import { BehaviorSubject } from 'rxjs';
import { authHeader, handleResponse } from '../_helpers';
import _ from 'lodash';
import moment from 'moment';
import { displayPartsToString } from 'typescript';
import { replace } from 'formik';

const apiUrl = JSON.parse(localStorage.getItem('config')).API_ENDPOINT;
const currentBATdataSubject = new BehaviorSubject(null);
const isDashboardBATDataReadySubject = new BehaviorSubject(false);
export const dashboardService = {
    initializeDashboard,
    filterByRequest,
    filterByPassword,
    filterByAdmin,
    filterByUserPassword,
    isDashboardBATDataReady: isDashboardBATDataReadySubject.asObservable(),
    currentBATdata: currentBATdataSubject.asObservable(),
    get currentBATdataValue () { return currentBATdataSubject.value },
    get isDashboardBATDataReadyValue () { return this.isDashboardBATDataReadySubject.value },
};

function compareValues(key, order='asc') {
    return function(a, b) {
      if(!Object.prototype.hasOwnProperty.call(a, key)  || 
         !Object.prototype.hasOwnProperty.call(b, key)) {
          return 0; 
      }      
      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
        
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? 
        (comparison * -1) : comparison
      );
    };
  }



function filterByRequest(rows) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          // if (!moment(startUTCTimeWithZ, moment.ISO_8601).isValid()) 
          //     reject('Start UTC Date is invalid: ' + startUTCTimeWithZ +  '. Format should look like "2016-10-13T08:35:47.510Z" ');
          // if (!moment(endUTCTimeWithZ, moment.ISO_8601).isValid()) 
          //     reject('End UTC Date is invalid:  ' + endUTCTimeWithZ +  '.  Format should look like "2016-10-13T08:35:47.510Z" ');

          let filterByRequest_Data = _.cloneDeep(currentBATdataSubject.value.Requests);
          // Group and subtotal by Violations
          filterByRequest_Data.map(function(o) {o.Hits = currentBATdataSubject.value.Failures.filter(function(x) { return x.Id === o.id }).length});
          // Add LastAccessTS to data
          filterByRequest_Data.map(function(x) {x.LastAccessTS = moment.utc(new Date(Math.max.apply(null, 
              currentBATdataSubject.value.Failures.map(function(e){if (x.id === e.id) return new Date(e.timestamp); else return new Date('1950-10-13T08:35:47.510Z');})
              ))).format();
          });
          filterByRequest_Data.sort(compareValues('Hits', 'desc'));
          if (rows > 0)
            filterByRequest_Data = filterByRequest_Data.slice(0,rows);
          resolve(filterByRequest_Data);
      }, 500);
  });
}

function filterByPassword(rows) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          // if (!moment(startUTCTimeWithZ, moment.ISO_8601).isValid()) 
          //     reject('Start UTC Date is invalid: ' + startUTCTimeWithZ +  '. Format should look like "2016-10-13T08:35:47.510Z" ');
          // if (!moment(endUTCTimeWithZ, moment.ISO_8601).isValid()) 
          //     reject('End UTC Date is invalid:  ' + endUTCTimeWithZ +  '.  Format should look like "2016-10-13T08:35:47.510Z" ');
          let filterByPassword_Data = _.cloneDeep(currentBATdataSubject.value.Password);
          filterByPassword_Data.map(function(o) {o.Violations = currentBATdataSubject.value.Failures.filter(function(x) { return x.user === o.user }).length});
          filterByPassword_Data.map(function(x) {x.LastAccessTS = moment.utc(new Date(Math.max.apply(null, 
              currentBATdataSubject.value.Failures.map(function(e){if (x.Id === e.Id) return new Date(e.timestamp); else return new Date('1950-10-13T08:35:47.510Z');})
              ))).format();
          });
          filterByPassword_Data.sort(compareValues('Violations', 'desc'));
          if (rows > 0)
            filterByPassword_Data = filterByPassword_Data.slice(0,rows);           
          resolve(filterByPassword_Data);
      }, 500);
  });
}

const admin2 = {};

function getData(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:4000/GetEventsAll');

  //let filterByAdmin_Data = {};
  //xhr.withCredentials = true;
  xhr.send();
  xhr.onload = function() {
    if (xhr.status != 200) { // HTTP error?
      // handle error
      console.log( 'Error: ' + xhr.status);
      return;
    } else {
      admin2 = xhr.response;
      return admin2;
      console.log(admin2);
    }
  };
  xhr.onerror = function() {
    // handle non-HTTP error (e.g. network down)
  };
}

function filterByAdmin2(rows){
  new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);
  
  }).then(function(result) {
  
    alert(result); // 1
  
    return new Promise((resolve, reject) => { // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) { // (**)
  
    alert(result); // 2
  
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) {
  
    alert(result); // 4
  
  });
}



function filterByAdmin(rows) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          // if (!moment(startUTCTimeWithZ, moment.ISO_8601).isValid()) 
          //     reject('Start UTC Date is invalid: ' + startUTCTimeWithZ +  '. Format should look like "2016-10-13T08:35:47.510Z" ');
          // if (!moment(endUTCTimeWithZ, moment.ISO_8601).isValid()) 
          //     reject('End UTC Date is invalid:  ' + endUTCTimeWithZ +  '.  Format should look like "2016-10-13T08:35:47.510Z" ');
        //   const request = new XMLHttpRequest();

        //   request.open('GET', 'http://localhost:4000/GetEventsAll');
        //   request.onload = () => {
        //     if (request.status === 200) {
        //       resolve(request.response); // we got data here, so resolve the Promise
        //     } else {
        //       reject(Error(request.statusText)); // status is not 200 OK, so reject
        //     }
        //   };
        
        //   request.onerror = () => {
        //     reject(Error('Error fetching data.')); // error occurred, reject the  Promise
        //   };
        
        //   request.send(); // send the request
        
        // console.log('Asynchronous request made.');
        // let filterByAdmin_Data = {};
        // return new promise.then((data) => {
        //   console.log('Got data! Promise fulfilled.');
        //   filterByAdmin_Data = JSON.parse(data).value.joke;
        //   //document.body.textContent = JSON.parse(data).value.joke;
        // }, (error) => {
        //   console.log('Promise rejected.');
        //   console.log(error.message);
        // });

      // }).then(function(result) {

      //   alert(result); // 1
      
      //   return new Promise((resolve, reject) => {
      //     setTimeout(() => {//resolve(result * 2), 1000);
        //let   JSON.parse(data).value.joke;
          let filterByAdmin_Data = _.cloneDeep(currentBATdataSubject.value.Admin);
          //var filterByAdmin_Data = _.cloneDeep(admin2.value.Admin);
          //console.log('Here...' + admin2[1]);
          //console.log(filterByAdmin_Data.map.);
          //let filterByAdmin_Data = _.clone(fakeAdmin); 
          // Add Hits to data for each document add how many access failures occured for a time frame
          //filterByAdmin_Data.map(function(o) {o.Hits = currentBATdataSubject.value.Failures.filter(function(x) { return x.id === o.id }).length});
                
          // Add AccessFailures to data
          //filterByAdmin_Data.map(function(o) {o.AccessFailures = currentBATdataSubject.value.Failures.filter(function(x) { if (x.id === o.id) return o.DocId})});
                    
          // Add LastAccessTS to data
          filterByAdmin_Data.map(function(x) {x.LastAccessTS = moment.utc(new Date(Math.max.apply(null, 
              currentBATdataSubject.value.Failures.map(function(e){if (x.id === e.id) return new Date(e.timestamp); else return new Date('1950-10-13T08:35:47.510Z');})
              ))).format();
          });

          //filterByAdmin_Data.sort(compareValues('Hits', 'desc'));
          if (rows > 0)
            filterByAdmin_Data = filterByAdmin_Data.slice(0,rows);
          resolve(filterByAdmin_Data);
      }, 500);
  });
}

function filterByUserPassword(rows) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          // if (!moment(startUTCTimeWithZ, moment.ISO_8601).isValid()) 
          //     reject('Start UTC Date is invalid: ' + startUTCTimeWithZ +  '. Format should look like "2016-10-13T08:35:47.510Z" ');
          // if (!moment(endUTCTimeWithZ, moment.ISO_8601).isValid()) 
          //     reject('End UTC Date is invalid:  ' + endUTCTimeWithZ +  '.  Format should look like "2016-10-13T08:35:47.510Z" ');
          
          let filterByUserPassword_Data = _.cloneDeep(currentBATdataSubject.value.UserPassword);
          //let filterByUserPassword_Data = _.mapValues(getFakeUser());
          //let filterByUserPassword_Data = _.mapValues(filterByUserPassword_Data1);
          // Add Hits to data for each document add how many access failures occured for a time frame
          filterByUserPassword_Data.map(function(o) {o.Hits = currentBATdataSubject.value.Failures.filter(function(x) { return x.id === o.id }).length});
          if(filterByUserPassword_Data.length > 0){
          // Add AccessFailures to data
          //filterByUserPassword_Data.map(function(o) {o.AccessFailures = currentBATdataSubject.value.Failures.filter(function(x) { if (x.Document.DocId === o.DocId) return o.DocId})});
                    
          // Add LastAccessTS to data
          filterByUserPassword_Data.map(function(x) {x.LastAccessTS = moment.utc(new Date(Math.max.apply(null, 
              currentBATdataSubject.value.Failures.map(function(e){if (x.id === e.id) return new Date(e.timestamp); else return new Date('1950-10-13T08:35:47.510Z');})
              ))).format();
          });

          filterByUserPassword_Data.sort(compareValues('Hits', 'desc'));
          if (rows > 0)
            filterByUserPassword_Data = filterByUserPassword_Data.slice(0,rows);
        }
          resolve(filterByUserPassword_Data);
      }, 500);
  });
}

function initializeDashboard(startUTCTimeWithZ, endUTCTimeWithZ) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader(),
      body: JSON.stringify({ startUTCTimeWithZ, endUTCTimeWithZ })
  };
  return fetch(`${apiUrl}/dashboard`, requestOptions)
 // return fetch(`http://2019RMS.CHRIS2019.LOCAL/dashboard`, requestOptions)
      .then(handleResponse)
      .then(data => {
          currentBATdataSubject.next(null);
          isDashboardBATDataReadySubject.next(false);
          //#######Admin#######
          //data.Admin.map(x => x.User = data.Admin.user);
          //data.Admin.map(function(o) {o.Hits = 1});
          //data.Admin.map(function(o) {o.filename = 1});
          //data.Admin.map(function(o) {o.id =  undefined});
          // Replace value of DocType in Document 
          //data.Documents.map(x => Object.assign(x, data.DocTypes.find(y => y.DocTypeId === x.DocTypeId)));
          //data.Documents.map(x => Object.assign(x, data.Users.find(y => y.UserId === x.OwnerId)));
          // remove UserId from Documents JSON... so we don't get confused later :-)
          //data.Documents.map(({UserId, ...rest}) => rest);
          
          //  // Add keys to JSON Failures
          // data.Failures.map(function(o) {o.DisplayTS = undefined});
          // data.Failures.map(function(o) {o.Email = undefined});
          //  // data.Failures.map(function(o) {o.Name = newNameKeys});
          // data.Failures.map(function(o) {o.FailureType = undefined});       
          // data.Failures.map(function(o) {o.Document = undefined});
          // data.Failures.map(x => x.DisplayTS = new Date(x.TS).toLocaleDateString() + ' ' + new Date(x.TS).toLocaleTimeString());
          // data.Failures.map(x => Object.assign(x, data.FailureTypes.find(y => y.FailureTypeId === x.FailureTypeId)));
          // data.Failures.map(x => Object.assign(x, data.Users.find(y => y.UserId === x.UserId)));


          currentBATdataSubject.next(data);
          isDashboardBATDataReadySubject.next(true);
          return data;
      //   })
      // .catch(err => {
      //       // Do something for an error here
      });
}