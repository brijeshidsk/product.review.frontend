import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating'
import css from './css/Nav.css'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded home-card'>
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title as='div'>
            <strong>{product.productName}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.unitPrice}</Card.Text>
      </Card.Body>
      <Button variant="success" className="card-btn"><Link  to={`/product/${product.id}`}>Details</Link></Button>
    </Card>
  )
}

export default Product
