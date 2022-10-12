import React, { Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../features/cartSlice'
// import { useGetAllProductsQuery } from '../features/productsApi'

const Home = () => {
  const { items, status, error } = useSelector(state => state.products)
  // const { data, error, isLoading } = useGetAllProductsQuery()
  
  

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    navigate('/cart')
  }

  return (
    <div className='home-container'>
          <h2>New Arrivals</h2>
      {status === 'pending' ? <p>Loading...</p> : error ? <p>An Error occured</p> : (
        <Fragment>
          <div className='products'>
            {items?.map(product => (

              <Card className="shadow" key={product._id} style={{ width: '18rem', border: 'none', alignItems: 'center', textAlign: 'center' }}>
              <Card.Img variant="top" src={product.image.url} />
              <Card.Body style={{width: '100%'}}>
                <Card.Title>{product.name}</Card.Title>
                <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'baseline'}}>
                <Card.Text>{product.desc}</Card.Text>
                <Card.Text style={{fontSize: 20, fontWeight: 'bold'}}>${product.price}</Card.Text>
                </div>
                <Button variant="dark" onClick={() => handleAddToCart(product)} >Add to Cart</Button>
              </Card.Body>
              </Card>
            )
          )}
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Home