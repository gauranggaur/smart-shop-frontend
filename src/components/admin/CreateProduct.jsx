import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch } from 'react-redux'
import { productsCreate } from '../../features/productsSlice'

const CreateProduct = () => {

    const [productImage, setProductImage] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [brand, setBrand] = useState('')

    const dispatch = useDispatch()

    const imageUploadHandler = (e) => {
        const file = e.target.files[0]

        transformFile(file)
    }

    const transformFile = (file) => {
        const fileReader = new FileReader()

        if(file) {
            fileReader.readAsDataURL(file)
            fileReader.onloadend = () => {
                setProductImage(fileReader.result)
            }
        } else {
            setProductImage('')
        }

    }

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(productsCreate({
            name, price, desc, brand, image: productImage, token: JSON.parse(localStorage.getItem('token'))
        }))
    }



  return (
    <div className='form-container'>
        <Form onSubmit={submitHandler} >
            <Form.Group className="mb-3">
              <Form.Control accept='image/*' type="file" onChange={imageUploadHandler} />
            </Form.Group>
            <Form.Select className='mb-3' aria-label="Select Brand" onChange={e => setBrand(e.target.value)} required>
                <option>Select Brand</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Vivo">Vivo</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Oppo">Oppo</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder='Name' onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder='Price' onChange={e => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder='Description' onChange={e => setDesc(e.target.value)} />
            </Form.Group>
            <Button variant='outline-dark' type='submit'>Submit</Button>
        </Form>
        <div className='image-preview'>
            {productImage ? <img src={productImage} alt='product'></img> : <p>Image preview will appear here</p>}
        </div>
    </div>
  )
}

export default CreateProduct