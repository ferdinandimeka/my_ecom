import React, {useState, useEffect} from 'react'
import { Row, Col, Button, Form} from 'react-bootstrap'
import LoaderCardTwo from '../loaders/LoaderCardTwo'
import Message from '../components/Message'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { register } from '../Redux/actions/userActions'
import FormContainer from '../components/FormContainer'

function RegisterScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const history = useNavigate()

    const redirect = new URLSearchParams(window.location.search).get('redirect') || '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if(userInfo) {
            history(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        }
        else
        {
            dispatch(register(name, email, password))
        }
    }
    return (
        <div>
            <FormContainer>
                <h1>Sign Up</h1>
                { message && <Message variant='danger'>{message}</Message> }
                { error && <Message variant='danger'>{error}</Message> }
                { loading && <LoaderCardTwo /> }

                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type='name' placeholder='Enter Name' value={name}
                        onChange={(event) => setName(event.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address </Form.Label>
                        <Form.Control required type='email' placeholder='Enter Email' value={email}
                        onChange={(event) => setEmail(event.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type='password' placeholder='Enter Password' value={password}
                        onChange={(event) => setPassword(event.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}></Form.Control>
                    </Form.Group>

                    <Button className='mt-3' type='submit' variant='success'>Register</Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                    You have an account already!!! <Link to={redirect ? `/register?redirect=${redirect}`: '/login'}>Sign In</Link>
                    </Col>
                </Row>

            </FormContainer>
        </div>
    )

}

export default RegisterScreen
