import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct,listCategories } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import css from '../components/css/Nav.css'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  console.log("productId",productId);

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [unitsInStock, setUnitsInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [sellerName, setsellerName] = useState('')
  const [sellerEmail, setsellerEmail] = useState('')
  const [sellerContact, setsellerContact] = useState('')
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate
  const categoryList = useSelector((state) => state.categoryList)
  const {categories } = categoryList

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (productId != product.id) {
        dispatch(listProductDetails(productId))
      }else{

        setName(product.productName)
        setPrice(product.unitPrice)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.categoryId)
        setUnitsInStock(product.unitsInStock)
        setDescription(product.description)
        setsellerContact(product.sellerContact)
        setsellerEmail(product.sellerEmail)
        setsellerName(product.sellerName)
        
      }
    }
  }, [dispatch, history, productId,product, successUpdate])



  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        id: productId,
        productName: name,
        unitPrice: price,
        image: image,
        brand: brand,
        categoryId: category,
        description: description,
        unitsInStock: unitsInStock,
        sellerName: sellerName,
        sellerEmail: sellerEmail,
        sellerContact: sellerContact,
      })
    )
  }

  return (
    <div className="editscreen">
      <Link to='/admin/productlist' className='btn btn-light my-3 back-btn'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Update Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            {/* <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            ></Form.File> */}
            {/* {uploading && <Loader />} */}
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter unitsInStock'
              value={unitsInStock}
              onChange={(e) => setUnitsInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="formBasicSelect">
            <Form.Label>Select Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={e => {
                setCategory(e.target.value);
              }}
            >
              {categories.map((category)=>{
              return <option value={category.id} selected = {category == category.id ? "selected" : ""}>{category.name}</option>
              })}
            

            </Form.Control>
          </Form.Group> */}
           <Form.Group controlId='Category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <h1>Selller Details</h1>
          <Form.Group controlId='sellerName'>
            <Form.Label>Seller Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Seller Name'
              value={sellerName}
              onChange={(e) => setsellerName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='sellerEmail'>
            <Form.Label>Seller Email</Form.Label>
            <Form.Control
              type='text'
              placeholder='Seller Email'
              value={sellerEmail}
              onChange={(e) => setsellerEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='sellerContact'>
            <Form.Label>Seller Contact</Form.Label>
            <Form.Control
              type='text'
              placeholder='Seller Contact'
              value={sellerContact}
              onChange={(e) => setsellerContact(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button  variant="success" className="signin-btn" type='submit'>
             Update
          </Button>
        </Form>
        )}
      </FormContainer>
      <br/> 
      <br/>
    </div>
  )
}

export default ProductEditScreen
