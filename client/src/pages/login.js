import React, { useState, useEffect } from 'react'
import '../styles/auth.css'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'

function Login() {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const [typePass, setTypePass] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const { auth } = useSelector(state => state)

  useEffect(() => {
    if (auth.token) history.push("/")
  }, [auth.token, history])

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(userData))
  }

  return (
    <div className='auth_page'>
      <form onSubmit={handleSubmit}>
        <h3 className='text-uppercase'>Siutagram</h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            onChange={handleOnChangeInput}
            value={email}
            name='email'
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className='pass'>
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleOnChangeInput}
              value={password}
              name='password'
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Log In
        </button>
        <p className='my-2'>
          You don't have an account? <Link to="/register" style={{ color: 'crimson' }}>Register now</Link>
        </p>
      </form>
    </div>
  )
}

export default Login