import bodyParser from 'body-parser'
import express from 'express'
import logger from 'morgan'
import mongoose from 'mongoose'
import path from 'path'
import posts from './routes/postRoute.js'
import users from './routes/userRoute.js'
// import dbURI from './secrets'.dbURI;

const app = express()
const port = 5000

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE')
    return res.status(200).json({})
  }
  return next()
})

mongoose
  .connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use('/posts', posts)
app.use('/users', users)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})
