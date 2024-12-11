import React, {useState, useEffect} from 'react'
import axios from 'axios'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [appliances, setAppliances] = useState([])

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:5000/appliances?q=${query}`)
        .then(response => setAppliances(response.data))
        .catch(error => console.error('Error fetching appliances:', error))
    }
  }, [query])

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search Appliance"
      />
      <ul>
        {appliances.map(appliance => (
          <li key={appliance.id}>{appliance.type_name}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBar
