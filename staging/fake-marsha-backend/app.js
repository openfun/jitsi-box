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
app.post('/api/video/pairing-challenge', (req, res) => {
  if (!req.body.box_id || !req.body.secret) {
    res.status(422).json({
      jitsi_url: null,
    })
  } else if (req.body.secret == '111111') {
    res.status(200).json({
      jitsi_url: process.env.LINK,
    })
  } else {
    res.status(404).json({
      jitsi_url: null,
    })
  }
})

// Start the Express server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}!`))
