require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb',
  verify: function(req,res,buf) {
    var url = req.originalUrl;
    if (url.includes('/webhook')) {
        req.rawBody = buf.toString();
    }
  } 
}));


app.use(bodyParser.urlencoded({
  extended: true
}));

// redirect to route folder
const posts = require('./routes/api/posts')
app.use('/api/posts', posts)

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Server is running on port ${port}.`))

// stripe listen --forward-to http://localhost:4242/api/posts/webhook