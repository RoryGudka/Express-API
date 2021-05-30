import {useState, Fragment, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Display from './Display';
import Button from '@material-ui/core/Button';
import {UserContext} from '../../Contexts/UserContextProvider';

const Item = ({book}) => {
    const history = useHistory();
    const {user} = useContext(UserContext);
    const [url, setUrl] = useState(book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : "https://icon-library.net/images/no-image-icon/no-image-icon-0.jpg");
    const [title, setTitle] = useState(book.volumeInfo.title);
    const [author, setAuthor] = useState(book.volumeInfo.authors !== undefined ? book.volumeInfo.authors[0] : "");
    const [date, setDate] = useState(book.volumeInfo.publishedDate || "");

    const handleEdit = () => {
        let newBook = book;
        if(newBook.volumeInfo.imageLinks === undefined) newBook.volumeInfo.imageLinks = {thumbnail:url};
        else newBook.volumeInfo.imageLinks.thumbnail = url;
        newBook.volumeInfo.title = title;
        if(newBook.volumeInfo.authors === undefined) newBook.volumeInfo.authors = [author];
        else newBook.volumeInfo.authors[0] = author;
        newBook.volumeInfo.publishedDate = date;
        axios.put('http://localhost:3001/books/edit', {
            ...user,
            data:newBook
        }).then(res => {
            if(res.data.status === 200) {
                console.log("Successful Edit");
                history.push("/library");
            }
            else alert(res.data.message);
        }).catch(err => {
            alert("There was an error");
        });
    }

    return (
        <Fragment>
            <Display author={author} title={title} date={date} image={url} link={book.volumeInfo.infoLink} />
            <Paper style={{width:"80%", left:"10%", margin:"40px 0", padding:"10px 30px"}} elevation={3}>
                <div className="fieldWrapper">
                    <TextField fullWidth label="Image URL" value={url} onChange={e => setUrl(e.target.value)} />
                </div>
                <div className="fieldWrapper">
                    <TextField fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="fieldWrapper">
                    <TextField fullWidth label="Author" value={author} onChange={e => setAuthor(e.target.value)} />
                </div>
                <div className="fieldWrapper">
                    <TextField fullWidth label="Publish Date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div id="editBtnWrapper">
                    <Button variant="contained" color="primary" onClick={handleEdit}>Edit book</Button>
                </div>
            </Paper>
        </Fragment>
    )
}

export default Item;