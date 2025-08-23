const  getCharacters = async (setCharacters) =>  {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character")
        const data = await response.json()
        setCharacters(data?.results)
    } catch (error) {
        console.log(error)
    }
}

export default getCharacters