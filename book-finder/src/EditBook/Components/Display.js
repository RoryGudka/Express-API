import Paper from '@material-ui/core/Paper';

const Display = ({title, author, link, image, date}) => {
    return (
        <div id="resultWrapper">
            <Paper style={{borderRadius:"5px", paddingRight:"20px", margin:"20px 0"}} elevation={3}>
                <img className="bookImgWrapper" src={image} />
                <div className="infoWrapper">
                    <p style={{fontFamily:"'Nanum Gothic', sans-serif", fontSize:"28px", marginBottom:"20px"}}>{title}</p>
                    <p style={{fontFamily:"'Nanum Gothic', sans-serif",fontSize:"18px"}}>{"By: " + author + (date !== undefined && " (" + date.substring(0, 4) + ")")}</p>
                    <a target="_blank" href={link} style={{fontFamily:"'Nanum Gothic', sans-serif"}}>More information</a>
                </div>
            </Paper>
        </div>
    )
}

export default Display;