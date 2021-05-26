import Paper from '@material-ui/core/Paper';

const Result = ({search, result}) => {
    return (
        <div id="resultWrapper">
            <Paper style={{height:"50px"}} elevation={3}>
                <p style={{fontSize:"20px", top:"15px"}}>{"The author of " + search + " is " + result}</p>
            </Paper>
        </div>
    )
}

export default Result;