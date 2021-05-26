import {useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Result from './Result';

const Search = props => {
    const [value, setValue] = useState("");
    const [results, setResults] = useState(null);
    const [changed, setChanged] = useState(true);

    const handleSearch = () => {
        axios.get("http://localhost:3001/book", {
            params: {
                title:value
            }
        }).then(res => {
            setChanged(false);
            setResults(res.data);
        }).catch(err => {
            console.log("There was an error");
        });
    }

    return (
        <div>
            <div id="searchWrapper">
                <TextField label="Book Title" value={value} onChange={e => {
                    setValue(e.target.value);
                    setChanged(true);
                }} />
                <Button style={{marginLeft:"20px", top:"10px"}} variant="contained" color="primary" onClick={handleSearch}>Search</Button>
            </div>
            {results !== null && !changed && <Result search={value} result={results} />}
        </div>

    )
}

export default Search;