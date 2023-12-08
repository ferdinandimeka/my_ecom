import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import ProductCarousel from '../ProductCarousel'
import LoaderCardOne from '../loaders/LoaderCardOne'
import Message from '../Message'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'
import Products from '../Products'

function Homescreen() {

    const dispatch = useDispatch()

    // getting the productList state from the redux store
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    // dispatch ProductList action
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

  return (
    <div>
        {<ProductCarousel />}
        {/* {<Swipers />} */}

        <h1 className='text-center'>Latest Products</h1>
        {loading ? (
            <LoaderCardOne />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Row>
                {Array.isArray(products) ? (
                products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Products product={product}/>
                    </Col>
                ))
                ) : (
                    <Message variant='info'>No products available.</Message>
                )}
            </Row>
        )}

    </div>
  )
}

export default Homescreen