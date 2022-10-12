import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'


const Dashboard = () => {

  const user = useSelector(state => state.auth)

  if(!user.isAdmin) {
    return <p>Access Denied</p>
  }

  return (
    <div className='dashboard-container'>
        <div className='sidenav'>
            <h3 className='mb-4'>Quick Links</h3>
            <Nav.Link className='mb-3' as={Link} to='/admin/summary' style={{fontSize: 20}} >Summary</Nav.Link>  
            <Nav.Link className='mb-3' as={Link} to='/admin/products' style={{fontSize: 20}} >Products</Nav.Link>  
        </div>
        <div className='content'>
            <Outlet />
        </div>
    </div>
  )
}

export default Dashboard