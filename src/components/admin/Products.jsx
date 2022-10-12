import Button from 'react-bootstrap/Button'
import React, { Fragment } from 'react'
import {Outlet, useNavigate} from 'react-router-dom'

const Products = () => {

    const navigate = useNavigate()

  return (
    <Fragment>
        <div className='admin-header'>
            <h2>Products</h2>
            <Button variant='dark' onClick={() => navigate('/admin/products/create-product')} >Create</Button>
        </div>
        <Outlet />
    </Fragment>
  )
}

export default Products