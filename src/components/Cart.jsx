import React, {useEffect, Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { BsArrowLeftShort } from 'react-icons/bs'
import Nav from 'react-bootstrap/Nav';
import { addToCart, clearCart, decreaseCartQuantity, getTotals, removeFromCart } from '../features/cartSlice'
import PayButton from './auth/PayButton'

const Cart = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const cart = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth)

  useEffect(()=> {
    dispatch(getTotals())
  }, [dispatch, cart])


  const removeItemHandler = (item) => {
    dispatch(removeFromCart(item))
  }
  const decreaseQuantityHandler = (item) => {
    console.log(item)
    dispatch(decreaseCartQuantity(item))
  }
  const increaseQuantityHandler = (item) => {
    dispatch(addToCart(item))
  }
  const clearCartHandler = () => {
    dispatch(clearCart())
  }


  return (
    <div className='cart-container'>
      <h2>Shopping Cart</h2>
      { cart.cartItems.length === 0 ? (
        <div className='cart-empty'>
          <p>Your cart is currently empty</p>
          <Button as={Link} to='/' style={{backgroundColor: 'black', fontWeight: 500}}>Continue Shopping</Button>
        </div>
      ) : (
        <div>

          <div className='titles'>
            <h3 className='product-title'>Product</h3>
            <h3 className='price'>Price</h3>
            <h3 className='quantity'>Quantity</h3>
            <h3 className='total'>Total</h3>
          </div>

          <div className='cart-items'>
            {cart.cartItems?.map(item => (
             <Fragment>
              <div className='cart-item' key={item._id}>
                <div className='cart-product'>
                  <img src={item.image.url} alt={item.name}/>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <button onClick={() => removeItemHandler(item)}>Remove</button>
                  </div>
                </div>
                <div className='cart-product-price'>${item.price}</div>
                <div className='cart-product-quantity'>
                  <button onClick={() => decreaseQuantityHandler(item)}>-</button>
                  <div className='count'>{item.cartQuantity}</div>
                  <button onClick={() => increaseQuantityHandler(item)}>+</button>
                </div>
                <div className='cart-product-total-price'>
                  ${item.cartQuantity * item.price}
                </div>
              </div>
              </Fragment>
            ))}
          </div>
          
          <div className='cart-summary'>
            <Button variant='outline-secondary' className='clear-cart' onClick={() => clearCartHandler()}>Clear Cart</Button>
            <div className='cart-checkout'>
              <div className='subtotal'>
                <span>Subtotal</span>
                <span className='amount'>${cart.cartTotalAmount}</span>
              </div>
              <p>Free Shipping</p>
              <p>Taxes are calculated at checkout</p>

              {auth._id ? (
                <PayButton cartItems={cart.cartItems} />
              ) : (
                <Button variant='warning' style={{width: '15rem'}} onClick={() => navigate('/login')}>Login to Checkout</Button>
              )}

              <div style={{marginTop: '1rem'}}>
                <Nav.Link as={Link} to='/'><BsArrowLeftShort style={{fontSize: 25}} />Continue Shopping</Nav.Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart