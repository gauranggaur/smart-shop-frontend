import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'


const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {

            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id)

            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`Increased ${state.cartItems[itemIndex].name} Quantity`, {
                    position: 'bottom-left'
                })
            } else {
                const tempProduct = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProduct)
                toast.success(`Added ${tempProduct.name} to Cart`, {
                    position: 'bottom-left'
                })
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

        },

        removeFromCart(state, action) {

            const updatedCartItems = state.cartItems.filter(item => item._id !== action.payload._id)

            state.cartItems = updatedCartItems

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

            toast.error(`Removed ${action.payload.name} from Cart`, {
                position: 'bottom-left'
            })
        },

        decreaseCartQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id)

            if(state.cartItems[itemIndex].cartQuantity > 1 ) {
                state.cartItems[itemIndex].cartQuantity -= 1

                toast.info(`Deccreased ${state.cartItems[itemIndex].name} Quantity`, {
                    position: 'bottom-left'
                })

            } else if(state.cartItems[itemIndex].cartQuantity === 1 ) {
                const updatedCartItems = state.cartItems.filter(item => item._id !== action.payload._id)
                state.cartItems = updatedCartItems

                
                toast.error(`Removed ${action.payload.name} from Cart`, {
                    position: 'bottom-left'
                })
            }
            
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

        },

        clearCart(state, action) {
            state.cartItems = []

            toast.error(`Cart cleared`, {
                position: 'bottom-left'
            })

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

        },

        getTotals(state, action) {
            let {totalPrice, totalQuantity} = state.cartItems.reduce((acc, item) => {
                const {price, cartQuantity} = item
                const priceTotal = price * cartQuantity 

                acc.totalPrice += priceTotal
                acc.totalQuantity += cartQuantity 

                return acc
            }, {
                totalPrice: 0,
                totalQuantity: 0
            })

            state.cartTotalAmount = totalPrice
            state.cartTotalQuantity = totalQuantity

        }

    }
})

export const { addToCart, removeFromCart, decreaseCartQuantity, clearCart, getTotals } = cartSlice.actions
export default cartSlice.reducer 