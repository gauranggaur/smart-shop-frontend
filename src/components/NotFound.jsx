import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found'>
        <h1 style={{marginBottom: 40}}>404: Page Not Found</h1>
        <Button as={Link} to='/' style={{backgroundColor: 'black', fontWeight: 500}}>Continue Shopping</Button>
    </div>
  )
}

export default NotFound