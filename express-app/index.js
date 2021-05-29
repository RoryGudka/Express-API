const axios = require('axios');
const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken');
const {db, admin} = require('./firebase.js');

app.use(express.json());
app.use(cors())

const tokens = {}

const validateToken = (uid, token) => {
    if(tokens[uid] === token) return true;
    return false;
}

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
    if(validateToken(req.query.uid, req.query.token)) {
        db.collection('users').doc(req.query.uid).collection('books').get().then((querySnapshot) => {
            let all = [];
            querySnapshot.forEach((doc) => {
                all.push({doc:doc.id, ...doc.data()});
            });
            res.json(all);
        }).catch(err => {
            res.sendStatus(400);
        });
    }
    else res.sendStatus(400);
});

app.post('/books/add/', (req, res) => {
    console.log(req.body);
    if(validateToken(req.body.uid, req.body.token)) {
        db.collection('users').doc(req.body.uid).collection('books').add({
            ...req.body.data
        }).then(resp => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    }
    else res.sendStatus(400);
});

app.put('/books/edit/', (req, res) => {
    if(validateToken(req.body.uid, req.body.token)) {
        db.collection('users').doc(req.body.uid).collection('books').doc(req.body.data.doc).set(req.body.data).then(resp => {
            res.sendStatus(200);
        }).catch(err => {
            res.sendStatus(400);
        })
    }
    else sendStatus(400);
})

app.delete('/books/delete/', (req, res) => {
    if(validateToken(req.query.uid, req.query.token)) {
        db.collection("users").doc(req.query.uid).collection('books').doc(req.query.doc).delete().then(resp => {
            res.sendStatus(200);
        }).catch(err => {
            res.sendStatus(400);
        })
    }
    else sendStatus(400);
});

app.post('/login/', (req, res) => {
    admin.auth().getUser(req.body.username).then(resp => {
        if(resp.displayName === req.body.password) {
            admin.auth().createCustomToken(resp.uid).then((customToken) => {
                tokens[resp.uid] = customToken;
                res.json(customToken);
            });
        }
        else sendStatus(403);
    }).catch(err => {
        console.log(err.code);
        res.sendStatus(404);
    })
});

app.post('/signup/', (req, res) => {
    admin.auth().getUser(req.body.username).then(resp => {
        res.sendStatus(400);
    }).catch(err => {
        if(err.code === "auth/user-not-found") {
            console.log(req.body);
            admin.auth().createUser({
                uid:req.body.username,
                displayName:req.body.password
            }).then(resp => {
                admin.auth().createCustomToken(resp.uid).then((customToken) => {
                    console.log(resp);
                    tokens[resp.uid] = customToken;
                    res.json(customToken);
                });
            }).catch(err => {
                console.log(err.code);
                res.sendStatus(400);
            });
        }
        else {
            console.log(err.code);
            res.sendStatus(400);
        }
    });
});

app.listen(3001, () => {
    console.log("Server started on port 3001")
});
