import React, { useEffect, useState } from "react"
import "./SignUp.css"
import slotService from "../../Services/service.js"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { logo } from "../../Assets/index.js"

function SignUp({ authenticated, setAuthenticated, setLoginUser }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState([])

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    retrieveUsers()
  }, [])

  const retrieveUsers = () => {
    slotService
      .getAllUsers()
      .then(response => {
        console.log(response.data.users)
        setUsers(response.data.users)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const foundUser = users.find(
      user => user.email === email && user.password === password
    )
    if (foundUser) {
      setAuthenticated(true)
      setLoginUser(foundUser.username)
      toast.success(`Sign Up successful to ${foundUser.username} !`)
      navigate("/")
    } else {
      toast.error("Invalid email or password!")
    }
  }

  return (
    <div className="signup-container">
      <div className="wrapper">
        <img src={logo} alt="logo" width={100} height={100} />
        <h1>VenueNow</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )
}
export default SignUp
