import React, { Fragment, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/authSlice';

const Register = () => {

    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    
    useEffect(()=>{
        if(auth._id) {
            navigate('/cart')
        }
    }, [auth, navigate])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const dispatch = useDispatch()

    const formSubmitHandler = (e) => {
        e.preventDefault()

        dispatch(registerUser(user))
    }

  return (
    <Fragment>
    <div className='register-page'>
    <h1>Register</h1>
    <Form className='form' onSubmit={formSubmitHandler}>

    <Form.Group className="mb-2" controlId="formBasicName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Name"  onChange={e => setUser({...user, name: e.target.value})} />
    </Form.Group>

    <Form.Group className="mb-2" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={e => setUser({...user, email: e.target.value})} />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={e => setUser({...user, password: e.target.value})} />
    </Form.Group>
    
    <Button variant="secondary" type="submit">
      {auth.registerStatus === 'pending' ? 'Submitting' : 'Register'}
    </Button>

    {auth.registerStatus === 'rejected' && <p>{auth.registerError}</p>}

  </Form>
  </div>
  </Fragment>
  )
}

export default Register
