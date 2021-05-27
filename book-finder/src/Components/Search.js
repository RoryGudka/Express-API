import {useState} from 'react';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Result from './Result';

const Search = props => {
    const [type, setType] = useState(0);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [results, setResults] = useState(null);

    const handleGet = () => {
        axios.get("http://localhost:3001/book", {
            params: {
                title:title
            }
        }).then(res => {
            if(res.data.status === 200) setResults(res.data.data);
            else alert(res.data.message);
        }).catch(err => {
            console.log("There was an error");
        });
    }

    const handlePost = () => {
        axios.post("http://localhost:3001/book", undefined, {
            params: {
                title:title, 
                author:author 
            }
        }).then(res => {
            if(res.data.status === 200) setResults(res.data.data);
            else alert(res.data.message);
        }).catch(err => {
            console.log("There was an error");
        });
    }

    const handlePut = () => {
        axios.put("http://localhost:3001/book", undefined, {
            params: {
                title:title,
                author:author
            }
        }).then(res => {
            if(res.data.status === 200) setResults(res.data.data);
            else alert(res.data.message);
        }).catch(err => {
            console.log("There was an error");
        });
    }

    const handleDelete = () => {
        axios.delete("http://localhost:3001/book", {
            params: {
                title:title
            }
        }).then(res => {
            if(res.data.status === 200) setResults(null);  
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
            case 1:
                handlePost();
                break;
            case 2:
                handlePut();
                break;
            case 3:
                handleDelete();
                break;
            default:
                console.log("Whacky stuff occurring");
        }
    }

    return (
        <div>
            <div id="searchWrapper">
                <div id="selectWrapper">
                    <Select value={type} onChange={(e, val) => setType(val.props.value)}>
                        <MenuItem value={0}>Find Author</MenuItem>
                        <MenuItem value={1}>Create book</MenuItem>
                        <MenuItem value={2}>Update book</MenuItem>
                        <MenuItem value={3}>Delete book</MenuItem>
                    </Select>
                </div>
                <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
                {(type == 1 || type == 2) && <TextField label="Author" value={author} onChange={e => setAuthor(e.target.value)} />}
                <Button style={{marginLeft:"20px", top:"10px"}} variant="contained" color="primary" onClick={handleClick}>Search</Button>
            </div>
            {results !== undefined && results !== null && <Result search={results.title} result={results.author} />}
        </div>

    )
}

export default Search;