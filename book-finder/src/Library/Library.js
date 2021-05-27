import {useEffect, useState} from 'react';
import axios from 'axios';
import Book from './Components/Book';
import {nanoid} from 'nanoid';

const Library = props => {
    const [books, setBooks] = useState([]);

    const getBooks = () => {
        axios.get('http://localhost:3001/books/get').then(res => {
            setBooks(res.data);
        });
    }
    useEffect(() => {
        getBooks();
    }, []);

    const bookList = books.map(book => <Book key={nanoid()} getBooks={getBooks} doc={book.doc} title={book.volumeInfo.title} author={book.volumeInfo.authors[0]} />);

    return bookList;
}

export default Library;