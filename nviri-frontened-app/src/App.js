import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LocationDropdown from './components/LocationDropdown'
import SearchBar from './components/searchBar'
import TechnicianCarousel from './components/TechnicianCarousel'
import LoginPage from './components/LoginPage'
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Nviri Assignment</h1>
          <LocationDropdown />
          <SearchBar />
        </header>
        <Routes>
          <Route path="/login/user" element={<LoginPage type="user" />} />
          <Route
            path="/login/technician"
            element={<LoginPage type="technician" />}
          />
          <Route path="/" element={<TechnicianCarousel />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
