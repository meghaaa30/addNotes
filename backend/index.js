const connectTo= require('./db')
const express = require('express')
var cors= require('cors')
const app = express()
const port=5000;
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use(cors())
app.use(express.json())

//avail routes
app.use('/api/notes', require('./routes/notes'))

app.listen(port, ()=>{
    console.log(`successfully built on port http://localhost:${port}`)
})
connectTo();