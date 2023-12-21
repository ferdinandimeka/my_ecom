import React, { useEffect } from 'react'
import ProductCarousel from '../components/ProductCarousel'
import LoaderCardOne from '../loaders/LoaderCardOne'
import Paginator from '../components/Paginator'
import Message from '../components/Message'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Redux/actions/productActions'
import Products from '../components/Products'
import { useParams } from 'react-router-dom';

function Homescreen() {

    const dispatch = useDispatch()

    // getting the productList state from the redux store
    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const keyword = useParams().id

    // dispatch ProductList action
    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

  return (
    <div>
        {<ProductCarousel />}

        <h1 className='text-center'>Latest Products</h1>
        {loading ? (
            <LoaderCardOne />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <div>
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
            </div>
        )}
            <Paginator pages={pages} page={page} keyword={keyword} />
    </div>
  )
}

export default Homescreen