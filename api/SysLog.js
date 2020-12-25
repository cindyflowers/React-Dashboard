var moment = require('moment');
moment().format();
const express = require('express');
const app = express();
var cors = require('cors')
var proxy = require('express-http-proxy');
app.use(express.static('static_files'));

// app.get('/GetEventsAll', cors(), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for a Single Route'})
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })


app.listen(4000, () => {
  console.log('Server started at http://localhost:4000/');
});


//var staticFilesPath = path.resolve('static', '..', 'build');
// app.use('/api/', proxy('http://localhost:4000'));

// app.options('http://localhost:4000', function(req, res, next){
//   res.header('Access-Control-Allow-Origin', "http://localhost:3000");
//   res.header('Access-Control-Allow-Methods', 'GET');
//   res.header("Access-Control-Allow-Headers", "accept, content-type");
//   res.header("Access-Control-Max-Age", "1728000");
//   return res.sendStatus(200);
// });

// const fakeDatabase = {
//   'Philip': {job: 'professor', pet: 'cat.jpg'},
//   'John': {job: 'student',   pet: 'dog.jpg'},
//   'Carol': {job: 'engineer',  pet: 'bear.jpg'}
// };
const SQLite3 = require('sqlite3');
let Loaded = false;
var BaseDT = moment(this.date).format('YYYY-MM-DDTHH:mm:ss:SSZ');
//var EventDT = moment(this.date).format('YYYY-MM-DDTHH:mm:ss:SSZ');
//var EventDT = new Date();

var HistoryDays = 8;
let EventsPerDay = 96;

if (Loaded == false){
   Loaded = CreateBATData();
   if(Loaded==true){
      startTimers();
   }
} else {

}
 
let db = new SQLite3.Database('./DB/SysLog.db', SQLite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SysLog database.');
});

// var sqlite3 = require('sqlite3').verbose();
function errorCB(err) {
   console.log("SQL Error: " + err);
 }
  
 function successCB() {
   console.log("SQL executed fine");
 }

 function openCB() {
   console.log("Database OPENED");
 }

//db.transaction(function(ctx){
   db.exec("insert into FakeIP (text) values ('test')");
   // ctx.executeSql(`INSERT into FakeData (timestamp, software, version, src, user, url, receiver, msg, userAgent, type) VALUES (` + getDate() + `, '"software": "Vaultize"', '"version": "19.01.07"', ` + getSrc() + `, ` + getUser() + `, '192.168.1.20', 'test@test.com', ` + getMsg() + `, ` + getUserAgent() + `, 1)`);
   // ctx.executeSql("SELECT DATE('now')", [], function(tx, res) {
   //    for (let i = 0; i < res.rows.length; ++i) {
   //      console.log("item:", res.rows.item(i));
   //    }
   //  });
//    console.log('Here.');
//    ctx.executeSql("SELECT 10 / 5 as 'uppertext'", [], function (error, resultSet) {
//       var obj1 = resultSet.rows.item(0);
//       obj1.uppertext = 'ANOTHER';
//       console.log('Second uppertext result: ' + resultSet.rows.item(0).uppertext);
//    }, function(error) {
//       console.log('SELECT error: ' + error.message);
//    });
// })

app.get('/addFakeEvent', (req, res) => {
  //db.exec(`INSERT into FakeData (timestamp, software, version, src, user, url, receiver, msg, userAgent, type) VALUES ('test', '"software": "Vaultize"', '"version": "19.01.07"', 'test', 'test', '192.168.1.20', 'test@test.com', 'test', 'test', 1)`);
  var _date = getDate();
  //var _date = '"2019-11-05T13:51:21Z"';
  var _software = '"software": "Vaultize"';
  //_software = 'test';
  var _version = '"version": :19.01.07"';
  var _src = getSrc();
  _src = src1;
  var _user = getUser();
  var _url = '192.168.1.20';
  var _receiver = getReceiver();
  var _msg = getMsg();
  var _userAgent = getUserAgent();
  var _type = getRandomNumber(1,4);
  type = 1;
  db.exec("INSERT into FakeData (timestamp, software, version, src, user, url, receiver, msg, userAgent, type) VALUES ('" + _date + "', '" + _software + "', '" + _version + "', '" + _src + "', '" + _user + "', '" + _url + "', '" + _receiver + "', '" + _msg + "', '" + _userAgent + "', '" + _type + "')");
  console.log('adding event.');
  res.sendStatus(200);
});



// ###### Examples #######
// GET a list of all usernames
//
// To test, open this URL in your browser:
//   http://localhost:4000/users
app.get('/users', (req, res) => {
  const allUsernames = Object.keys(fakeDatabase); // returns a list of object keys
  console.log('allUsernames is:', allUsernames);
  res.send(allUsernames);
});


// GET profile data for a user
//
// To test, open these URLs in your browser:
//   http://localhost:3000/users/Philip
//   http://localhost:3000/users/Carol
//   http://localhost:3000/users/invalidusername
app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; // matches ':userid' above
  const val = fakeDatabase[nameToLookup];
  console.log(nameToLookup, '->', val); // for debugging
  if (val) {
    res.send(val);
  } else {
    res.send({}); // failed, so return an empty object instead of undefined
  }
});

var readRecordsFromMediaTable = function(callback){
  //var db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
  var allRecords = [];
      db.serialize(function() {
          db.each("SELECT * FROM FakeData", function(err, row) {
              myLib.generateLog(levelDebug, util.inspect(row));
              allRecords.push(row);
          }, function(err, count) {
              callback(allRecords);
              //db.close();
        });
    });
}

app.get("/GetEventsAll", cors(), function (req, res, next) {
  var sql = "SELECT * FROM FakeData"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.header("Access-Control-Allow-Headers", "accept, content-type");
      res.json({
          "Admin":rows
      })
    });
});

app.get('/GetEvents/:type', cors(), function (req, res, next) {
    const eventType = req.params.type;
    const type = "Admin";
    switch(eventType){
      case 1:
          type = "Admin"
        break;
      case 2:
          type = "Requests"
        break;
      case 3:
          type = "Password"
        break;
      case 4:
          type = "UserPassword"
        break;
      default:
          type = "Admin"
    }
    var sql = "select * from FakeData where type = " + eventType;
    var params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.header("Access-Control-Allow-Headers", "accept, content-type");
      res.json({
            type:rows
        })
    })
  });

function CreateBATData(){
   //myArrStr = '{"timestamp": "' + getDate() + '", "software": "Vaultize", "version": "19.01.07", "src": ["192.168.1.20","192.168.56.1"], "user": "testuser", "url": "https://192.168.12.43", "filename": ["Vaultize Server:(3.2.6)/Online Folder/share/vault.txt"], "msg": "FILE DRM View Request Failed", "userAgent": "Python-httplib2/0.10.3 (gzip)" },{"timestamp": "' + getDate() + '", "software": "Vaultize", "version": "19.01.07", "src": ["192.168.1.20","192.168.56.1"], "user": "testuser", "url": "https://192.168.12.43", "filename": ["Vaultize Server:(3.2.6)/Online Folder/share/vault.txt"], "msg": "FILE DRM View Request Failed", "userAgent": "Python-httplib2/0.10.3 (gzip)" }';
   var i = 0;
   while(i < 30)
      {
         addEvent();
         i = i + 1;
      }
   return true;
}

function startTimers() {
   let timer = setInterval(() => {addEvent()}, getRandomNumber(1,60));
   clearTimeout(timer);
}

function getRandomNumber(begin, end){
 var min = Math.ceil(begin);
 var max = Math.floor(end);
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDate(){
   //var date = new Date(dateString);
   //var BaseDT = new Date(Date.today);
   //var EventDate = new Date(BaseDT.getFullYear + 1900, BaseDT.getMonth(), BaseDT.getDate() + Math.random() * HistoryDays, Math.random() * 24, Math.random() * 60)
   //return EventDate;
   //return moment(this.date).format('YYYY-MM-DDTHH:mm:ss:SSZ');
   return '2019-12-05T13:22:05Z';
}

function getUser(){
   var i = getRandomNumber(1,10);
   var usernm = '';
   return 'test';
   this.getJSON(_Users, function(data){
        usernm = data[i].Username;
   });
   //usernm = loadData[i].Username;
   return usernm;
}

var src1 = null;

function getSrc(){
  var i = getRandomNumber(1,10);
  console.log('random number: ' + i);
  let src = null;
  let sql = 'select text from FakeIP where id = ?';
  db.get(sql, [i], (err, row) => {
    //return row.text;
    if (err) {
      return console.error(err.message);
    } else {
    src1 = row.text;
    console.log(i, row.text);
    console.log(src1);
    //return row.text;
    //return row._text;
      //? console.log(row.id, row.text)
      //: console.log(`No src found with the id ${i}`);
    }
    //return src;
  });
  // while(src == null){
  //   if(src == null){
  //   console.log('test');
  //   }
  //   else {
  //     return src;
  //   }
  //}
  //return '10.0.0.1' + i + src.text;
}



function getFile(){
   var i = getRandomNumber(1,5);
   var filenm = '';
   return 'test';
   this.getJSON(_Files, function(data){
        filenm = data[i].Filename;
   });
   //return filenm;
}

function getReceiver(i){
  //var i = getRandomNumber(1,10);
  var msg = '';
  return 'test';
  this.getJSON(_Msg, function(data){
       msg = data[i].Msg;
  });
  return msg;
}

function getMsg(i){
   //var i = getRandomNumber(1,10);
   var msg = '';
   return 'test';
   this.getJSON(_Msg, function(data){
        msg = data[i].Msg;
   });
   return msg;
}

function getUserAgent(){
   var i = getRandomNumber(1,7);
   var useragent = '';
   return 'test';
   this.getJSON(_UserAgent, function(data){
        useragent = data[i].userAgent;
   });
   return useragent;
}

// function getRandDate(rangeOfDays,startHour,hourRange){
//    var today = new Date(Date.now());
//    return new Date(today.getYear() + 1900, moment().today.getMonth(), today.getDate()+ Math.random() * rangeOfDays, Math.random() * hourRange + startHour, Math.random()*60)
// }

function addEvent(){

}

