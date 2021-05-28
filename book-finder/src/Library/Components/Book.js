import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {UserContext} from '../../Contexts/UserContextProvider';
import {BookContext} from '../../Contexts/BookContextProvider';

const Book = ({full, title, author, doc, getBooks, link, image, date, description}) => {
    const history = useHistory();
    const {setBook} = useContext(BookContext);
    const {user} = useContext(UserContext);
    
    const handleClick = () => {
        axios.delete('http://localhost:3001/books/delete', {params: {doc,user}}).then(res => {
            if(res.status === 200) {
                console.log("Successful deletion");
                getBooks();
            }
            else alert("An error has occurred");
        }).catch(err => {
            alert("An error has occurred");
        })
    }

    const handleEdit = () => {
        setBook(full);
        history.push("/edit");
    }

    return (
        <div id="resultWrapper">
            <Paper style={{borderRadius:"5px", paddingRight:"20px", margin:"20px 0"}} elevation={3}>
                <img className="bookImgWrapper" src={image} />
                <div className="infoWrapper">
                    <p style={{fontFamily:"'Nanum Gothic', sans-serif", fontSize:"28px", marginBottom:"20px"}}>{title}</p>
                    <p style={{fontFamily:"'Nanum Gothic', sans-serif",fontSize:"18px"}}>{"By: " + author + (date !== undefined && " (" + date.substring(0, 4) + ")")}</p>
                    <a target="_blank" href={link} style={{fontFamily:"'Nanum Gothic', sans-serif"}}>More information</a>
                </div>
                <div className="buttonWrapper">
                    <div className="buttonWrapper2">
                        <Button variant="outlined" color="primary" onClick={handleEdit}>Edit book</Button>
                    </div>
                    <Button variant="outlined" color="primary" onClick={handleClick}>Remove from library</Button>
                </div>
            </Paper>
        </div>
    )
}

export default Book;