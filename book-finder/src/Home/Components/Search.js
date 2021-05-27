import {useState} from 'react';
import axios from 'axios';
//import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Result from './Result';
import {nanoid} from 'nanoid';

const Search = props => {
    const [type, setType] = useState(0);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [results, setResults] = useState([]);

    const handleGet = () => {
        axios.get("http://localhost:3001/books", {
            params: {
                title:title
            }
        }).then(res => {
            if(res.data.status === 200) {
                if(res.data.data.items !== undefined) setResults(res.data.data.items);
                else alert("No results found");
            }
            else alert(res.data.message);
        }).catch(err => {
            console.log("There was an error");
        });
    }

    const handleClick = () => {
        switch(type) {
            case 0:
                handleGet();
                break;
            default:
                console.log("Whacky stuff occurring");
        }
    }

    const addToLibrary = index => {
        axios.post("http://localhost:3001/books/add", {
            data:results[index]
        }).then(res => {
            if(res.status === 200) console.log("Successful addition to library");  
            else alert("There was an error");
        }).catch(err => {
            console.log("There was an error");
        });
    }

    const resList = results.map((item, index) => <Result key={nanoid()} title={item.volumeInfo.title} author={item.volumeInfo.authors !== undefined ? item.volumeInfo.authors[0] : "Unknown"} index={index} addToLibrary={addToLibrary} />);

    /*
    <Select value={type} onChange={(e, val) => setType(val.props.value)}>
        <MenuItem value={0}>Find Author</MenuItem>
        <MenuItem value={1}>Create book</MenuItem>
        <MenuItem value={2}>Update book</MenuItem>
        <MenuItem value={3}>Delete book</MenuItem>
    </Select>
    */
    return (
        <div>
            <div id="searchWrapper">
                <div id="selectWrapper">
                    
                </div>
                <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
                {(type === 1 || type === 2) && <TextField label="Author" value={author} onChange={e => setAuthor(e.target.value)} />}
                <Button style={{marginLeft:"20px", top:"10px"}} variant="contained" color="primary" onClick={handleClick}>Search</Button>
            </div>
            {resList}
        </div>

    )
}

export default Search;