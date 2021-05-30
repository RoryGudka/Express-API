import {useState, useContext} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Result from './Result';
import {nanoid} from 'nanoid';
import {UserContext} from '../../Contexts/UserContextProvider';

const Search = props => {
    const {user} = useContext(UserContext);
    const [title, setTitle] = useState("");
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
            alert("There was an error");
        });
    }

    const handleClick = () => {
        handleGet();
    }

    const addToLibrary = index => {
        if(user !== undefined) {
            axios.post("http://localhost:3001/books/add", {
                data:results[index],
                ...user
            }).then(res => {
                if(res.data.status === 200) console.log("Successful addition to library");  
                else alert(res.data.message);
            }).catch(err => {
                alert("There was an error");
            });
        }
        else alert("Log in to add to library");
    }

    let resList = results.map((item, index) => <Result 
        key={nanoid()} 
        title={item.volumeInfo.title} 
        author={item.volumeInfo.authors !== undefined ? item.volumeInfo.authors[0] : "Unknown"} 
        index={index} 
        addToLibrary={addToLibrary} 
        link={item.volumeInfo.infoLink} 
        image={item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.thumbnail : "https://icon-library.net/images/no-image-icon/no-image-icon-0.jpg"}
        date={item.volumeInfo.publishedDate}
    />);

    if(results.length === 0) resList = <p id="searchAdvisor">Make a search to find books</p>

    return (
        <div>
            <div id="searchWrapper">
                <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <Button style={{marginLeft:"20px", top:"10px"}} variant="contained" color="primary" onClick={handleClick}>Search</Button>
            </div>
            {resList}
        </div>

    )
}

export default Search;