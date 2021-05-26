let axios = require('axios');
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/book/', cors(), (req, res) => {
    const title = req.query.title;
    axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
            q:title
        }
    }).then(response => {
        if(response.status !== 200) {
            res.send("Request failed");
        } 
        else res.send(response.data.items[0].volumeInfo.authors[0]);
    }).catch(err => {
        res.send("Request failed");
    })
})

app.listen(3001, () => {
    console.log("Server started on port 3001")
})