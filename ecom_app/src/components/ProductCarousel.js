import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Redux/actions/productActions'
import { Carousel, Image } from 'react-bootstrap'
import LoaderCardOne from '../loaders/LoaderCardOne'
import Message from './Message'

function ProductCarousel() {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  
  return loading ? (
    <LoaderCardOne />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : products && products.length > 0 ? (
    <Carousel pause='hover' className='bg-dark'>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />

            <Carousel.Caption className='carousel.caption'>
              <h4 style={{ FontColor: 'brown'}}>
                {product.name} (${product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <Message variant='danger'>No products found</Message>
  )
}

export default ProductCarousel