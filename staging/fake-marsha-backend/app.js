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

// Check-code route
app.post('/marsha/login', (req, res) => {
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
