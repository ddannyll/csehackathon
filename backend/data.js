import fs from 'fs';
const databaseFile = __dirname + '/../data.json';




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
      users: []
    };
    fs.writeFileSync(databaseFile, JSON.stringify(database, null, 4), { flag: 'w' });
  }
}




export { getData, setData, databaseInit };
