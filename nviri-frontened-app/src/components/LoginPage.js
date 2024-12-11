import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom' // Import useNavigate hook
import Cookies from 'js-cookie'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate() // Get the navigate function

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/') // Use navigate() for redirecting
  }

  const onSubmitFailure = errorMsg => {
    setErrorMsg(errorMsg)
    setShowSubmitError(true)
    setIsLoading(false)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://nviri-assignment-080118524994.herokuapp.com/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    setIsLoading(true) // Set loading to true when making the API request

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      onSubmitFailure('Something went wrong. Please try again later.')
    }
  }

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <navigate to="/" />
  }

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={submitForm}>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            value={username}
            className="username-input-field"
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="password-input-field"
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginPage