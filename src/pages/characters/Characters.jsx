import CardComponent from "../../components/CharacterCard"
import { useState } from "react"

function Charachters(){
    const [searchQuery, setSearchQuery] = useState("");

    const charachters = [
        {id: 1, name: "rick", status:"alive"},
        {id: 2, name: "morty", status:"alive"},
        {id: 3, name: "summer", status:"alive"},
    ]
    
    const handleSearch = (e) => {
        e.preventDefault()
    }

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
                {charachters.map(charInfo => <CardComponent charInfo={charInfo} key={charInfo.id}/> )}  
            </div>
        </div>
    )
}

export default Charachters