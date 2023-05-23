const express = require('express')
const bodyParser = require('body-parser')

// const request = require('request')
const { trending, search } = require(__dirname+"/data.js")
const app = express()
const port = 8000

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))




app.get('/', (req, res) => {
    trending()
    .then(parsedInfo => {
      // Render the EJS template and pass the parsed GIF information
      res.render('list', { listOfGifs: parsedInfo , listTitle:"trending" });
      res.sendFile(__dirname + '/request.js');
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))