import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../styles/Headers.css'
import { logout } from '../Redux/actions/userActions'
import { NavDropdown,  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import './Headers.css'


function Headers() {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0)
    const formattedTotalQuantity = typeof totalQuantity === 'number' ? totalQuantity.toFixed() : '';

    const logoutHandler = () =>{
        dispatch(logout())
    }

  return (
    <header>
        <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>LunaBay</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle className='toggle' aria-controls='navbarScroll' />
                <Navbar.Collapse>

                    <Nav>
                        <LinkContainer to='/'>
                            <Nav.Link><i className='fas fa-home'></i>{' '}Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className='fas fa-shopping-cart'></i>
                            <span className='cartAmount'>
                                {formattedTotalQuantity}
                            </span>
                            {' '}Cart
                            </Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>

                            ) : (

                            <LinkContainer to="/login">
                            <Nav.Link><i className="fas fa-user"></i>{' '}Login</Nav.Link>
                            </LinkContainer>
                        )}

                    {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id="adminmenu">
                        <LinkContainer to='/userlist'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/productlist'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/orderlist'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Headers