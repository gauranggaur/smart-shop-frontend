import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import Cart from './components/Cart'
import Home from './components/Home';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CheckoutSuccess from './components/auth/CheckoutSuccess';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Summary from './components/admin/Summary'
import CreateProduct from './components/admin/CreateProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/cart' element={<Cart />} exact />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path='/notFound' element={<NotFound />} />
          <Route path="*" element={<Navigate to ="/notFound" />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Dashboard />}>
            <Route path='products' element={<Products />} >
              <Route path='create-product' element={<CreateProduct />} />
            </Route>
            <Route path='summary' element={<Summary />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
