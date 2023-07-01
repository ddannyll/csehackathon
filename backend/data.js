import fs from 'fs';
const databaseFile ='./data.json';

let tempDatabase;

// // Example database
// {
//   "users": [
//       {
//           "userID": "dan",
//           "tags": ["hackathon", "wine"]
//       }
//   ],
//   "events": {
//       "5": {
//           "eventID": "5",
//           "hostID": "kieren",
//           "eventName": "tokyo",
//           "date": "17/3/24",
//           "description": "going to TOKYOOO",
//           "tags": [
//               "local",
//               "temple"
//           ],
//           "location": "sydney",
//           "members": [
//               "william",
//               "kieren"
//           ],
//           "img": "./image"
//       },
//       "sdj": {
//           "eventID": "sdj",
//           "eventName": "tokyo",
//           "date": "17/3/24",
//           "description": "going to TOKYOOO",
//           "tags": [
//               "local",
//               "temple"
//           ],
//           "location": "sydney",
//           "members": [
//               "william",
//               "kieren"
//           ],
//           "img": "./image"
//       }
//   }
// }

function getData() {
  const readDatabase = fs.readFileSync(databaseFile, { flag: 'r', encoding: 'ascii' });
  tempDatabase = JSON.parse(readDatabase.toString());
  return tempDatabase;
}


function setData(newData) {
  tempDatabase = newData;
  fs.writeFileSync(databaseFile, JSON.stringify(tempDatabase, null, 4));
}

function databaseInit() {
  if (!fs.existsSync(databaseFile)) {
    const database = {
      users: {},
      events: {}
    };
    fs.writeFileSync(databaseFile, JSON.stringify(database, null, 4), { flag: 'w' });
  }
}




export { getData, setData, databaseInit };