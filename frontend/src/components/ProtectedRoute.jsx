import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Navigate } from 'react-router'
import { Outlet } from 'react-router-dom'

export default function ProtectedRoute({children, isAdmin}) {
 
const {user} = useContext(AuthContext)

if(!user) return <Navigate to='/login' />

if (isAdmin && !user.isAdmin) return <Navigate to='/' />;

return children;
}
