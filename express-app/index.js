const axios = require('axios');
const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken');
const db = require('./firebase.js');

app.use(express.json());
app.use(cors())

app.get('/books/', (req, res) => {
    const title = req.query.title;
    axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
            q:title
        }
    }).then(response => {
        if(response.status !== 200) {
            res.json({
                status:400,
                message:"Request failed"
            });
        } 
        else res.json({
            status:200,
            message:"Successful search",
            data:response.data
        });
    }).catch(err => {
        res.json({
            status:400,
            message:"Request failed"
        });
    })
});

app.get('/books/get/', (req, res) => {
    const user = req.query.user;
    db.collection('users').doc(user).collection('books').get().then((querySnapshot) => {
        let all = [];
        querySnapshot.forEach((doc) => {
            all.push({doc:doc.id, ...doc.data()});
        });
        res.json(all);
    }).catch(err => {
        res.sendStatus(400);
    })
});

app.post('/books/add/', (req, res) => {
    db.collection('users').doc(req.body.user).collection('books').add({
        ...req.body.data
    }).then(resp => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(400);
    })
});

app.put('/books/edit/', (req, res) => {
    db.collection('users').doc(req.body.user).collection('books').doc(req.body.data.doc).set(req.body.data).then(resp => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(400);
    })
})

app.delete('/books/delete/', (req, res) => {
    db.collection("users").doc(req.query.user).collection('books').doc(req.query.doc).delete().then(resp => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(400);
    })
});

app.listen(3001, () => {
    console.log("Server started on port 3001")
});
