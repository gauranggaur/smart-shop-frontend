import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { url } from './api'

const initialState = {
    items: [],
    status: null,
    error: null,
    createProductStatus: null
}

export const productsFetch = createAsyncThunk(
    'products/productsFetch',
    async (id= null, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${url}/products`)
            return response?.data
        } catch (error) {
            return rejectWithValue('error.response.data')
        }
    }
)

export const productsCreate = createAsyncThunk (
    'products/productsCreate',
    async(values) => {
        try {
            const response = await axios.post(`${url}/createProduct`, values)
            toast.success(`Created new product`, {
                position: 'bottom-left'
            })
            return response.data
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }
    }
)


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = 'pending'
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = 'success'
            state.items = action.payload
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
        [productsCreate.pending]: (state, action) => {
            state.createProductStatus = 'pending'
        },
        [productsCreate.fulfilled]: (state, action) => {
            state.createProductStatus = 'success'
            state.items.push(action.payload)
        },
        [productsCreate.rejected]: (state, action) => {
            state.createProductStatus = 'rejected'
            state.error = action.payload
        },
    }
})

export default productsSlice.reducer