import React, { useEffect } from 'react'
import ProductCarousel from '../components/ProductCarousel'
import LoaderCardOne from '../loaders/LoaderCardOne'
import Paginator from '../components/Paginator'
import Message from '../components/Message'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Redux/actions/productActions'
import Products from '../components/Products'
import { useNavigate } from 'react-router-dom';

function Homescreen() {

    const dispatch = useDispatch()
    const history = useNavigate()


    // getting the productList state from the redux store
    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    
    // getting the keyword from the url
    const keyword = window.location.search ? window.location.search : ''


    // dispatch ProductList action
    useEffect(() => {
        dispatch(listProducts(keyword))
        history(keyword)
    }, [dispatch, keyword, history])

  return (
    <div>
        {!keyword && <ProductCarousel />}

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

                <Paginator page={page} pages={pages} keyword={keyword} />
            </div>
        )}
    </div>
  )
}

export default Homescreen