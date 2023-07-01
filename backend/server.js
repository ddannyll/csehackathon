import { getData, setData, databaseInit} from './data.js'
import express from 'express'
import { helloWorld } from './test.js'

import { getEventDetails, createNewEvent } from './events.js'
import { v4 as uuidv4 } from 'uuid';
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

app.listen(6060, () => {
  console.log('Started server')
})



app.post('/events/createEvent', (req, res) => {
  const {hostID, eventName, date, description, tags, location, members, img} =  req.body;
  const randomID = uuidv4();

  createNewEvent(randomID, hostID, eventName, date, description, tags, location, members, img)
  res.json();
  res.json()
}) 

//dynamic 
app.get('/events/getEventDetails/:id', (req, res) => {
  const id = req.params.id;

  const event = getEventDetails(id);
  res.json(event);
})


// Messages
app.get('/messages/getEventMessages/:id', (req, res) => {
  const id = req.params.id;
  const messages = getEventMessages(id);
  res.json(messages);
})

app.post('/messages/sendEventMessage', (req, res) => {
  const {eventID, userID, content} = req.body;
  sendEventMessage(eventID, userID, content);
  res.json();
})
