import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../actions/user'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Users(props) {
    const usersReducer = useSelector(state => state.getUsersReducer)
    const { error, users, loading } = usersReducer

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const roleChangeHandler = (e) => {
        console.log(e.target.value);
    }
    const updateHandler = (e) => {
        console.log(e.target.value);
    }
    const deleteHandler = (e) => {
        console.log("deleted");
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
                                    <td>
                                        <select onChange={(e) => roleChangeHandler(e)}>
                                            <option value={user.isAdmin ? "Admin" : "User"}>{user.isAdmin ? "Admin" : "User"}</option>
                                            <option value={user.isAdmin ? "User" : "Admin"}>{user.isAdmin ? "User" : "Admin"}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button type="button" className="small" onClick={(e) => updateHandler}>Edit</button>
                                    </td>
                                    <td>
                                        <button type="button" className="small" onClick={deleteHandler}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
        </div>
    )
}
