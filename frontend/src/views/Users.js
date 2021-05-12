import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_DETAILS_RESET } from '../actions/types'
import { getUsers, adminDeleteUser } from '../actions/user'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Users(props) {
    const usersReducer = useSelector(state => state.getUsersReducer)
    const { error, users, loading } = usersReducer
    const userSignIn = useSelector(state => state.userSignInReducer)
    const { userInfo } = userSignIn
    const deleteReducer = useSelector(state => state.adminDeleteReducer)
    //const { errorDelete, successDelete, loadingDelete } = deleteReducer

    if (!userInfo) {
        props.history.push("/signin")
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: USER_DETAILS_RESET })
        dispatch(getUsers())
    }, [dispatch])

    const updateHandler = (userId) => {
        props.history.push(`/profile/${userId}`)
    }
    const deleteHandler = (userId) => {
        dispatch(adminDeleteUser(userId))
        users.filter(user => user._id !== userId)
    }

    return (
        <div>
            <div>Users</div>
            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant="danger">{error}</MessageBox> :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                                    <td>
                                        <button type="button" className="small" onClick={(e) => updateHandler(user._id)}>Edit</button>
                                    </td>
                                    <td>
                                        <button type="button" className="small" onClick={() => deleteHandler(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
        </div>
    )
}
