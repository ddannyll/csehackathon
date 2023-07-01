import { getData } from './data.js'
import express from 'express'
import { helloWorld } from './test.js'

const app = express()

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
