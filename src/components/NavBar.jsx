import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillBagFill } from "react-icons/bs";
import { FiSearch } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../features/authSlice';
import { toast } from 'react-toastify';


const NavBar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cartTotalQuantity } = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth)

  const logoutHandler = () => {
    dispatch(logoutUser()) 
    toast.warning('Logged Out', {
      position: 'bottom-left'
    })
    navigate('/')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand style={{marginLeft: 50, fontWeight: 700, fontSize: 30}}><Nav.Link as={Link} to='/'>SMART SHOP</Nav.Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className='search-bar'>
            <Form className="d-flex" style={{marginLeft: 350, marginRight: 450 }}>
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{width: 500}}
            />
            <Button variant="outline-dark"><FiSearch style={{width: 25, height: 25}} /></Button>
            </Form>
          </div>
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
          <div className='nav-bag'>
            <Nav.Link as={Link} to="/cart" ><BsFillBagFill style={{width: 25, height: 25}} /></Nav.Link>
            
              {cartTotalQuantity > 0 && <span className='bag-quantity'><span>{cartTotalQuantity}</span></span>}
            
          </div>
          </Nav>
          { !auth._id ? 
          <div><Nav.Link as={Link} to='/register' style={{fontSize: 20}}>Register</Nav.Link> <Nav.Link as={Link} to='/login' style={{fontSize: 20}}>Login</Nav.Link></div> : 
          <div>
          {auth.isAdmin && <Nav.Link as={Link} to='/admin' style={{fontSize: 20}} > Admin </Nav.Link> }
              
            <Nav.Link style={{fontSize: 20}} onClick={()=> logoutHandler()} > Logout </Nav.Link>
          </div>
               }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;