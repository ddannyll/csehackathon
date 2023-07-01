import { databaseInit} from './data.js'
import express from 'express'
import { helloWorld } from './test.js'
import { createNewEvent, updateName, updateLocation, updateDate, updateImage, addMember, removeMember, addEventTag, removeEventTag, getFeed, getEventDetails, deleteEvent, updateLimit } from './events.js'
import { v4 as uuidv4 } from 'uuid';
import { register, login, profileDetails, updateProfile } from './users.js';
import { getEventMessages, sendEventMessage } from './messages.js';

const app = express()
databaseInit();

app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})


app.get('/hello', (req, res) => {
  res.send(helloWorld())
})

app.get('/getfeed', (req, res) => {
  const { userID } = req.query;
  res.send(getFeed(userID));
});


app.listen(6060, () => {
  console.log('Started server')
})

app.post('/users/register', (req, res) => {
  const { username, password } = req.body;
  return res.json(register(username, password));
})

app.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  return res.json(login(username, password));
})

app.post('/users/updateProfile', (req, res) => {
  const { username, bio, tags, picture } = req.body;
  return res.json(updateProfile(username, bio, tags, picture));
})

app.post('/users/profileDetails', (req, res) => {
  const { username } = req.body;
  return res.json(profileDetails(username));
})

app.post('/events/createEvent', (req, res) => {
  const { hostID, eventName, date, description, tags, location, limit, members, img } = req.body;
  const randomID = uuidv4();

  createNewEvent(randomID, hostID, eventName, date, description, tags, location, limit, members, img)
  res.json()
}) 

app.post('/events/deleteEvent', (req, res) => {
  const { userID, eventID } = req.body;

  const success = deleteEvent(userID, eventID);
  res.json(success);
});

app.get('/events/getEventDetails/:id', (req, res) => {
  const id = req.params.id;
  
  const event = getEventDetails(id);
  res.json(event);
})

app.post('/events/updateName', (req, res) => {
  const { userID, eventID, newName } = req.body;

  const success = updateName(userID, eventID, newName);
  res.json(success);
})

app.post('/events/updateLocation', (req, res) => {
  const { userID, eventID, newLocation } = req.body;

  const success = updateLocation(userID, eventID, newLocation);
  res.json(success);
})

app.post('/events/updateDate', (req, res) => {
  const { userID, eventID, newDate } = req.body;

  const success = updateDate(userID, eventID, newDate);
  res.json(success);
})

app.post('/events/updateImage', (req, res) => {
  const { userID, eventID, newImage } = req.body;

  const success = updateImage(userID, eventID, newImage);
  res.json(success);
})

app.post('/events/updateLimit', (req, res) => {
  const { userID, eventID, newLimit } = req.body;

  const success = updateLimit(userID, eventID, newLimit);
  res.json(success);
})

app.post('/events/addMember', (req, res) => {
  const { userID, eventID } = req.body;

  const success = addMember(userID, eventID);
  res.json(success);
})

app.post('/events/removeMember', (req, res) => {
  const { userID, removeID, eventID } = req.body;

  const success = removeMember(userID, removeID, eventID);
  res.json(success);
})


app.post('/events/addEventTag', (req, res) => {
  const { userID, eventID, tag } = req.body;

  const success = addEventTag(userID, eventID, tag);
  res.json(success);
})

app.post('/events/removeEventTag', (req, res) => {
  const { userID, eventID, tag } = req.body;

  const success = removeEventTag(userID, eventID, tag);
  res.json(success);
})



// Messages
app.get('/messages/getEventMessages/:id', (req, res) => {
  const id = req.params.id;
  const messages = getEventMessages(id);
  res.json(messages);
})

app.post('/messages/sendEventMessage', (req, res) => {
  const { userID, eventID, content } = req.body;
  sendEventMessage(eventID, userID, content);
  res.json();
})