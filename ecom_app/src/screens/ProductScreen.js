import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import LoaderCardTwo from '../loaders/LoaderCardTwo'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../Redux/actions/productActions'
import { useParams } from 'react-router-dom'
import { PRODUCT_CREATE_REVIEW_RESET } from '../Redux/constants/productConstants'
import { createProductReview } from '../Redux/actions/productActions'

function ProductScreen() {

    const [rating, setRating] = useState(0)
    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const { id } = useParams();
    const history = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productCreateReview = useSelector((state) => state.productCreateReview)
    const {
      success: successProductReview,
      loading: loadingProductReview,
      error: errorProductReview,
    } = productCreateReview

    // Handlers
    const addToCartHandler = () => {
      history(`/cart/${id}?qty=${qty}`)
    }
  
    const submitHandler = (event) => {
      event.preventDefault()
      dispatch(
        createProductReview(id, {
          rating,
          comment,
        })
      )
    }

    useEffect(() => {
        // If review successfully submited then reset
      if (successProductReview) {
        setRating(0)
        setComment('')
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      }

        dispatch(listProductDetails(id))
    }, [dispatch, id, successProductReview, history])

  return (
    <div>
        <Link to="/" className="btn btn-light my-3">Go Back</Link>
      {loading ? (
        <LoaderCardTwo />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6} id='col-1'>
            <img src={product.image} alt={product.name} className='img' />
            </Col>

            <Col md={3} id='col-2'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"f8e825"}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                Price: ${product.price}
              </ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
            </Col>

            <Col md={3} id='col-3'>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Col>Price: </Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Col>Status: </Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control as="select" value={qty}
                          onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((x) =>
                            (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button 
                      className="btn-block" 
                      disabled={product.countInStock === 0} 
                      type='button'
                      onClick={addToCartHandler}
                    >
                      Add to Cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6} id='col-4'>
              <h4 className='mt-3'>Reviews</h4>

              {product && product.reviews && product.reviews.length === 0 && (
                <Message variant='info'>No Reviews</Message>
              )}

              <ListGroup variant='flush'>
                {product.reviews && product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color='f8e825' />
                  <p>{review.createdAt && String(review.createdAt).substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h4>Write a Review</h4>

                  {loadingProductReview && <LoaderCardTwo />}
                  {successProductReview && (
                    <Message variant='success'>Review Submitted</Message>
                  )}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>

                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </ Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Review</Form.Label>

                        <Form.Control
                          as='textarea'
                          row='5'
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                        />
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                        className='my-3'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='info'>
                      Please <Link to='/Login'></Link>to write a review.
                    </Message>
                  )}

                </ListGroup.Item>

              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default ProductScreen