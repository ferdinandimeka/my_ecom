import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { listAllOrders, deleteOrder } from '../Redux/actions/orderActions'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import LoaderCardTwo from '../loaders/LoaderCardTwo'


function OrderListScreen() {

    const history = useNavigate()
    const dispatch = useDispatch()

    /** pulling out the state */
    const orderListAll = useSelector((state) => state.orderListAll)
    const { loading, error, orders } = orderListAll

    /** pulling out the current user */
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderDelete = useSelector((state) => state.orderDelete)
    const {
        success: successDelete,
    } = orderDelete

    useEffect(() => {
        // restricted for users, only for admin
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAllOrders())
        } else {
            history('/login')
        }
        
        // Updates the orders state
        if (successDelete) {
            dispatch(listAllOrders())
        }

    }, [dispatch, history, successDelete, userInfo])

    /* HANDLER */
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this order ?")) {
        dispatch(deleteOrder(id));
        }
    };

  return (
    <div>
        <h1>Orders</h1>

        {loading ? (
            <LoaderCardTwo />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.User && order.User.name}</td>
                            <td>{order.createdAt && String(order.createdAt).substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                    order.paidAt && String(order.paidAt).substring(0, 10)
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    order.deliveredAt && String(order.deliveredAt).substring(0, 10)
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                        Details
                                    </Button>
                                </LinkContainer>

                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(order._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        )} 
    </div>
  )
}

export default OrderListScreen