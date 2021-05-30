import './Styles/App.css';
import {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import Book from './Components/Book';
import {nanoid} from 'nanoid';
import {UserContext} from '../Contexts/UserContextProvider'

const Library = props => {
    const {user} = useContext(UserContext);
    const [books, setBooks] = useState([]);

    const getBooks = () => {
        if(user !== undefined) {
            axios.get('http://localhost:3001/books/get', {
                params: {
                    ...user
                }
            }).then(res => {
                if(res.data.status === 200) {
                    setBooks(res.data.data);
                    console.log("Successful retrieval");
                }
                else alert(res.data.message);
            }).catch(err => {
                alert("There was an error");
            });
        }
    }

    useEffect(() => {
        getBooks();
    }, [user])

    if(user === undefined) return(
        <p id="logInAdvisor">Log in to see your library</p>
    )
    else if(books.length == 0) return (
        <p id="logInAdvisor">Your library is empty</p>
    )
    const bookList = books.map(book => <Book 
        key={nanoid()} 
        getBooks={getBooks} 
        doc={book.doc} 
        image={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : "https://icon-library.net/images/no-image-icon/no-image-icon-0.jpg"}
        link={book.volumeInfo.infoLink} 
        title={book.volumeInfo.title} 
        author={book.volumeInfo.authors !== undefined && book.volumeInfo.authors[0]} 
        date={book.volumeInfo.publishedDate}
        description={book.volumeInfo.description}
        full={book}
    />);

    return bookList;
}

export default Library;