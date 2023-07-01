import express from 'express'
import { helloWorld } from './test.js'
import { getFeed } from './events.js'

const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})


app.get('/hello', (req, res) => {
  res.send(helloWorld())
})

app.get('/getfeed', (req, res) => {
  const user_id = req.header('userId');
  const event_id = req.query;
  res.send(getFeed(user_id, event_id));
});

app.listen(6060, () => {
    console.log('started server')
})
