import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { url } from './api'

const initialState = {
    token: localStorage.getItem('token'),
    name: '',
    email: '',
    _id: '',
    isAdmin: '',
    registerStatus: '',
    registerError: '',
    loginStatus: '',
    loginError: '',
    userLoaded: false
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (user, {rejectWithValue}) => {
        try {

           const token = await axios.post(`${url}/register`, {
                name: user.name,
                email: user.email,
                password: user.password
            })
            
            localStorage.setItem('token', JSON.stringify(token.data))
            
            return token.data

        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (user, {rejectWithValue}) => {
        try {
            const token = await axios.post(`${url}/login`, {
                email: user.email,
                password: user.password
            })
           
            localStorage.setItem('token', JSON.stringify(token.data))

            return token.data
        

        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token

            if(token) {
                const user = jwtDecode(token)
                
                state.name = user.name
                state.email = user.email
                state._id = user._id
                state.isAdmin = user.isAdmin
                state.userLoaded = true
            }
        },
        logoutUser(state, action) {
            localStorage.removeItem('token')

            return {
                ...state,
                token: '',
                name: '',
                email: '',
                _id: '',
                isAdmin: '',
                registerStatus: '',
                registerError: '',
                loginStatus: '',
                loginError: '',
                userLoaded: false
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.registerStatus = 'pending'
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {

                const user = jwtDecode(action.payload)
                
                    state.token = action.payload
                    state.name = user.name
                    state.email = user.email
                    state._id = user._id
                    state.isAdmin = user.isAdmin
                    state.registerStatus = 'success'
              
            } 
        })
        builder.addCase(registerUser.rejected, (state, action) => {
           
                state.registerStatus = 'rejected'
                state.registerError = action.payload
          
        })

        builder.addCase(loginUser.pending, (state, action) => {
            state.loginStatus = 'pending'
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if(action.payload) {
                
                const user = jwtDecode(action.payload)

                
                state.token = action.payload
                state.name = user.payload
                state.email = user.email
                state._id = user._id
                state.isAdmin = user.isAdmin
                state.loginStatus = 'success'
            } else {
                console.log('action payload not avilable')
            }
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loginStatus = 'rejected'
            state.loginError = action.payload
        })
    }
})

export const { loadUser, logoutUser } = authSlice.actions

export default authSlice.reducer