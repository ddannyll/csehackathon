const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

const eventRouter = require("./routes/events")
const userRouter = require("./routes/users")
const messageRouter = require("./routes/messages")

app.use('/events', eventRouter)
app.use('/users', userRouter)
app.use('/messages', messageRouter)

app.listen(3000, () => {
    console.log('started server')
})
