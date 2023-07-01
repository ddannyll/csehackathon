import { getData, setData, databaseInit} from './data.js'
import express from 'express'
import { helloWorld } from './test.js'

import { getEventDetails, createNewEvent } from './events.js'
import { v4 as uuidv4 } from 'uuid';


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
  console.log('started server')
})



app.post('/events/createEvent', (req, res) => {
  const {hostID, eventName, date, description, tags, location, members, img} =  req.body;
  const randomID = uuidv4();

  createNewEvent(randomID, hostID, eventName, date, description, tags, location, members, img)
}) 

//dynamic 
app.get('/events/getEventDetails/:id', (req, res) => {
  res.send('hello');
  const id = req.params.id;
  // console.log(id);
  getEventDetails(id);
})
