let axios = require('axios');
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

//Whoops if I misspelled anything
let data = [
    {
        name:"The Hunger Games",
        author:"Suzanne Collins"
    },
    {
        name:"1984",
        author:"George Orwell"
    },
    {
        name:"The Hobbit",
        author:"J.R.R. Tolkien"
    },
    {
        name:"Harry Potter",
        author:"J.K. Rowling"
    }
]

const searchByTitle = title => {
    for(let i = 0; i < data.length; i++) {
        if(data[i].name.toLowerCase() == title.toLowerCase()) return data[i].author;
    }
    return "No results found";
}

const addBook = (title, author) => {
    data.push({
        name:title,
        author:author
    });
}

const findIndex = title => {
    for(let i = 0; i < data.length; i++) {
        if(data[i].name.toLowerCase() == title.toLowerCase()) return i;
    }
}

const updateBook = (title, author) => {
    data[findIndex(title)].author = author;
}

const deleteBook = title => {
    data.splice(findIndex(title), 1);
}

app.get('/book/', (req, res) => {
    const title = req.query.title;
    if(searchByTitle(title) === "No results found") {
        res.json({
            status:404,
            message:"Book not found",
            data: {
                title:title
            }
        });
    }
    else {
        res.json({
            status:200,
            message:"Author successfully found",
            data: {
                title:title,
                author:searchByTitle(title)
            }
        });
    }
    //Temporarily blocked code to implement custom "database"
    /*
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
    */
});

app.get('/books/', (req, res) => {
    res.json({
        status:200,
        message:"Books successfully found",
        data: {
            books:data
        }
    });
})

app.post('/book/', (req, res) => {
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
    else if(searchByTitle(title) !== "No results found") {
        res.json({
            status:400,
            message:"Book with title '" + title + "' already exists",
            data: {
                title:title,
                author:author
            }
        });
    }
    else {
        addBook(title, author);
        res.json({
            status:200,
            message:"Book successfully added",
            data: {
                title:title,
                author:author
            }
        });
    }
});

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

app.listen(3001, () => {
    console.log("Server started on port 3001")
});