
import {useState, createContext} from 'react';

const BookContext = createContext();

const BookContextProvider = ({children}) => {
    const [book, setBook] = useState(null);
    return (
        <BookContext.Provider value={{book, setBook}}>
            {children}
        </BookContext.Provider>
    )
}

export default BookContextProvider;
export {BookContext};