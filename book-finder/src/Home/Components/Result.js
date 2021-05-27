import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Result = ({title, author, addToLibrary, index}) => {
    
    const handleClick = () => {
        addToLibrary(index);
    }

    return (
        <div id="resultWrapper">
            <Paper style={{padding:"5px 20px", margin:"20px 0"}} elevation={3}>
                <b><p style={{fontSize:"24px"}}>{title}</p></b>
                <p style={{fontSize:"20px"}}>{"By: " + author}</p>
                <div className="buttonWrapper">
                    <Button variant="outlined" color="primary" onClick={handleClick}>Add to library</Button>
                </div>
            </Paper>
        </div>
    )
}

export default Result;