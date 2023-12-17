import React, { useEffect }from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import LoaderCardTwo from '../loaders/LoaderCardTwo';
import Message from "../components/Message";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../Redux/actions/userActions";

export default function UserListScreen() {

  const dispatch = useDispatch()
  const history = useNavigate()

  /** Getting state */
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { users, error, loading } = userList

  // we need the success value so when we successfully delete the user we want the new data
  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    // For admins
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history("/login")
    }
  },[dispatch, history, successDelete, userInfo])

  /** Handlers */
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to the delete this user ?")) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div>
      <h1>Users</h1>

      {loading ? (
        <LoaderCardTwo />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) =>(
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
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
