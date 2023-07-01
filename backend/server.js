import { getData, setData, databaseInit} from './data.js'
import express from 'express'
import { helloWorld } from './test.js'
import { getFeed, getEventDetails, deleteEvent } from './events.js'

const app = express()
databaseInit();

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

app.delete('/deleteEvent', (req, res) => {
  const event_id = req.query('eventID');
  res.send(deleteEvent(event_id));
});

app.get('/events/getEventDetails/:id', (req, res) => {
  res.send('hello');
  const id = req.params.id;
  // console.log(id);
  getEventDetails(id);
})

app.post('/events/createEvent', (req, res) => {
  const { id, event_name, date, picture } =  req.body

}) 

app.listen(6060, () => {
  console.log('started server')
})