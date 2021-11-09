// app.js
const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Create Express app
const app = express()

// Request parsing
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));


// cors
app.use(cors());

// A sample route
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/login', (req, res) => {
  if (req.body.code == '111111') {
    res.status(200).json({
      success: true,
      link: process.env.LINK,
    })
  } else {
    res.status(404).json({
      success: false,
      link: null,
    })
  }
})

// Start the Express server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}!`))
