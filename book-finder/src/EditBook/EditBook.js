import './Styles/App.css';
import {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {BookContext} from '../Contexts/BookContextProvider';
import Item from './Components/Item';

const EditBook = props => {
    const {book} = useContext(BookContext);

    if(book === null) return <Redirect to="/" />
    return (
        <Item book={book} />
    )
}

export default EditBook;