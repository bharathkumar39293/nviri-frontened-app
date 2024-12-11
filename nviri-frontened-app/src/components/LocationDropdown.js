import React, {useState, useEffect} from 'react'
import axios from 'axios'

const LocationDropdown = () => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    axios
      .get('https://nviri-assignment-080118524994.herokuapp.com/locations')
      .then(response => {
        // If the response is an array of objects, map to just get the names.
        const locationNames = response.data.map(location => location)
        setLocations(locationNames) // Set the array of location names
      })
      .catch(error => console.error('Error fetching locations:', error))
  }, [])

  return (
    <select className="location-dropdown">
      <option value="">Select Location</option>
      {locations.map((location, index) => (
        <option key={index} value={location} className="options">
          {location}
        </option>
      ))}
    </select>
  )
}

export default LocationDropdown
