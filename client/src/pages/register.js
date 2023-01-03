import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'

function Register() {
  const { auth, alert } = useSelector(state => state)
  const history = useHistory()
  const dispatch = useDispatch()

  const initialState = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    cf_password: '',
    gender: 'male'
  }
  const [userData, setUserData] = useState(initialState)
  const { fullname, username, email, password, cf_password } = userData

  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)


  const handleOnChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register(userData))
  }

  useEffect(() => {
    if (auth.token) history.push("/")
  }, [auth.token, history])

  return (
    <div className='auth_page'>
      <form onSubmit={handleSubmit}>
        <h3 className='text-uppercase'>Siutagram</h3>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            onChange={handleOnChangeInput}
            value={fullname}
            name='fullname'
            style={{ background: `${alert.fullname ? '#fd2d6a14' : ''}` }}
          />
          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ''}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={handleOnChangeInput}
            value={username.toLowerCase().replace(/ /g, '')}
            name='username'
            style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
          />
          <small className="form-text text-danger">
            {alert.username ? alert.username : ''}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            onChange={handleOnChangeInput}
            value={email}
            name='email'
            style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
          />
          {alert.email
            ? <small className="form-text text-danger">{alert.email}</small>
            : <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          }
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
              style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
            />
            <small className='show-pass' onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.password ? alert.password : ''}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="cf_password">Confirm your password</label>
          <div className='pass'>
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="cf_password"
              onChange={handleOnChangeInput}
              value={cf_password}
              name='cf_password'
              style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }}
            />
            <small className='show-pass' onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ''}
          </small>
        </div>
        <div className='row justify-content-between mx-0 mb-1'>
          <label htmlFor='male'>
            Male: <input type="radio" id='male' name='gender' value="male" defaultChecked onChange={handleOnChangeInput} />
          </label>
          <label htmlFor='female'>
            Female: <input type="radio" id='female' name='gender' value="female" onChange={handleOnChangeInput} />
          </label>
          <label htmlFor='other'>
            Other: <input type="radio" id='other' name='gender' value="other" onChange={handleOnChangeInput} />
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-100"
        >
          Sign up
        </button>
        <p className='my-2'>
          Already have an account? <Link to="/login" style={{ color: 'crimson' }}>Login now</Link>
        </p>
      </form>
    </div>
  )
}

export default Register