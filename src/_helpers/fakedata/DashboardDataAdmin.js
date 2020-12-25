let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:4000/GetEventsAll');
var admin;
//xhr.withCredentials = true;
xhr.send();
xhr.onload = function() {
  if (xhr.status != 200) { // HTTP error?
    // handle error
    console.log( 'Error: ' + xhr.status);
    return;
  } else {
   admin = xhr.response;
   console.log(admin);
  }
};
xhr.onerror = function() {
  // handle non-HTTP error (e.g. network down)
};
export default{
    admin
}

