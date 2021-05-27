import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const Book = ({title, author, doc, getBooks}) => {
    const handleClick = () => {
        axios.delete('http://localhost:3001/books/delete', {params: {doc:doc}}).then(res => {
            if(res.status === 200) {
                console.log("Successful deletion");
                getBooks();
            }
            else console.log("An error has occurred");
        }).catch(err => {
            console.log("An error has occurred");
        })
    }

    return (
        <div id="resultWrapper">
            <Paper style={{padding:"5px 20px", margin:"20px 0"}} elevation={3}>
                <b><p style={{fontSize:"24px"}}>{title}</p></b>
                <p style={{fontSize:"20px"}}>{"By: " + author}</p>
                <div className="buttonWrapper">
                    <Button variant="outlined" color="primary" onClick={handleClick}>Remove from library</Button>
                </div>
            </Paper>
        </div>
    )
}

export default Book;