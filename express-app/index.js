const axios = require('axios');
const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken');
const db = require('./firebase.js');

app.use(express.json());
app.use(cors())
const accessTokenSecret = 'fjdasl3i2ou4dfeouidI*)67664387h$@#$@#JFdlkjfadda';

const users = [
    {
        username:"fake_username",
        password:"fake_password",
        role:"admin"
    }  
]

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
    db.collection('books').get().then((querySnapshot) => {
        let all = [];
        querySnapshot.forEach((doc) => {
            all.push({doc:doc.id, ...doc.data()});
        });
        res.json(all);
    });
});

app.post('/books/add/', (req, res) => {
    db.collection('books').add({
        ...req.body.data
    })
    res.sendStatus(200);
});

app.delete('/books/delete/', (req, res) => {
    db.collection("books").doc(req.query.doc).delete().then(resp => {
        res.sendStatus(200);
    });

})

app.put('/book/', (req, res) => {
    const title = req.query.title;
    const author = req.query.author;
    if(title === undefined || author === undefined) {
        res.json({
            status:400,
            message:"Invalid input",
            data: {
                title:title,
                author:author
            }
        });
    }
    else if(searchByTitle(title) === "No results found") {
        res.json({
            status:400,
            message:"Book with title '" + title + "' doesn't exist",
            data: {
                title:title,
                author:author
            }
        });
    }
    else {
        updateBook(title, author);
        res.json({
            status:200,
            message:"Book successfully updated",
            data: {
                title:title,
                author:author
            }
        });
    }
});

app.delete('/book/', (req, res) => {
    const title = req.query.title;
    if(title === undefined) {
        res.json({
            status:400,
            message:"Invalid input",
            data: {
                title:title
            }
        });
    }
    else if(searchByTitle(title) === "No results found") {
        res.json({
            status:400,
            message:"Book with title '" + title + "' doesn't exist",
            data: {
                title:title
            }
        });
    }
    else {
        deleteBook(title);
        res.json({
            status:200,
            message:"Book successfully deleted",
            data: {
                title:title
            }
        });
    }
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
        res.json({accessToken});
    } else {
        res.send('Username or password incorrect');
    }
});

app.listen(3001, () => {
    console.log("Server started on port 3001")
});
