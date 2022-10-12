import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { url } from '../../features/api'
import Button from 'react-bootstrap/esm/Button'



const PayButton = ({ cartItems }) => {

    const auth = useSelector(state => state.auth)
    

    const checkoutHandler = async () => {
        await axios.post(`${url}/create-checkout-session`, {
            cartItems,
            userId: auth._id
        }).then(res => {
            if(res.data.url) {
                window.location.href = res.data.url
            }
        }).catch(error => console.log(error.message))
    }

  return (
    <div>
        <Button onClick={()=> checkoutHandler()} style={{width: '9rem'}} variant='danger'>Checkout</Button>
    </div>
  )
}

export default PayButton