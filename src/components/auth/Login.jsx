import React, { Fragment, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/authSlice';

const Login = () => {

    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    
    useEffect(()=>{
        if(auth._id) {
            navigate('/cart')
        }
    }, [auth, navigate])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()

    const formSubmitHandler = (e) => {
        e.preventDefault()

        dispatch(loginUser(user))
    }

  return (
    <Fragment>
    <div className='register-page'>
    <h1>Login</h1>
    <Form className='form' onSubmit={formSubmitHandler}>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={e => setUser({...user, email: e.target.value})} />
     
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={e => setUser({...user, password: e.target.value})} />
    </Form.Group>
    
    <Button variant="secondary" type="submit">
      {auth.loginStatus === 'pending' ? 'Submitting' : 'Login'}
    </Button>

    {auth.loginStatus === 'rejected' && <p>{auth.loginError}</p>}

  </Form>
  </div>
  </Fragment>
  )
}

export default Login
