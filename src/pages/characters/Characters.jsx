import CardComponent from "../../components/CharacterCard"
import { useState , useEffect} from "react"
import getCharacters from "../../api/getCharacters";
import './charachters.css'; 


function Charachters(){
    const [searchQuery, setSearchQuery] = useState("");
    const [charachters, setCharacters] = useState([]);
 
    
    const handleSearch = (e) => {
        e.preventDefault()
    }

    useEffect(() => {  
    getCharacters(setCharacters)
    },[])

    return(
        <div className="home-page">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search Your Favorite Charachter..."
                    className="search-input" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}     
                />
                <button type="submit" className="submit-btn">Search</button>
            </form>
            <div className="char-grid">
                {charachters.map(item => <CardComponent item={item} key={item.id}/> )}  
            </div>
        </div>
    )
}

export default Charachters