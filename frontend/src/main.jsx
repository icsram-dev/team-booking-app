import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Accommodations from './routes/Accommodations'
import Users from './routes/admin/Users'
import './index.css'
import AccommodationsAdminView from "./routes/admin/AccommodationsAdminView"
import AccommodationDetail from './routes/AccommodationDetail'
import CreateAccommodation from "./routes/CreateAccommodation"
import EditUserByUser from "./routes/EditUserByUser"
import EditAccommodation from "./routes/EditAccommodation"
import Login from "./routes/Login"
import Profile from "./routes/Profile"
import Registration from "./routes/Registration"
import Bookings from './routes/Bookings'
import Favourites from './routes/Favourites'
import Home from './routes/Home'
import EditUser from './routes/admin/EditUser'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import BookingsAdminView from './routes/admin/BookingsAdminView'
import EditAccommodationByAdmin from './routes/admin/EditAccommodationByAdmin'
import Admin from './routes/admin/Admin'
import UserAccommodation from './routes/UserAccommodation'
import AccommodationAdminDetails from './routes/admin/AccommodationAdminDetails'
import User from './routes/admin/UserDetails'
import EditUserPassword from './routes/EditUserPassword'
import ProfileSettings from './routes/ProfileSettings'
import AccommodationId from './routes/AccommodationId'
import CreateBooking from './routes/admin/CreateBooking'
import EditBookingByAdmin from "./routes/admin/EditBookingByAdmin"
import EditBooking from "./routes/EditBooking"

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [

      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
      {
        path: 'accommodations',
        element: <Accommodations />,
      },
      {
        path: 'accommodations/:id',
        element: <AccommodationId />,
      },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: 'accommodation/:accommodationId/edit',
        element: <ProtectedRoute><EditAccommodation /></ProtectedRoute>,
      },
      {
        path: 'accommodation/user/:userId/createaccommodation',
        element: <ProtectedRoute><CreateAccommodation /></ProtectedRoute>,
      },
      {
        path: 'accommodation/user/:userId',
        element: <ProtectedRoute><UserAccommodation /></ProtectedRoute>,
      },
      {
        path: 'user/edit',
        element: <ProtectedRoute><EditUserByUser /></ProtectedRoute>,
      },
      {
        path: 'user/bookings',
        element: <ProtectedRoute><Bookings /></ProtectedRoute>,
      },
      {
        path: 'user/profilesettings',
        element: <ProtectedRoute><ProfileSettings /></ProtectedRoute>,
      },
      {
        path: 'user/security',
        element: <ProtectedRoute><EditUserPassword /></ProtectedRoute>,
      },
      {
        path: 'favourites',
        element: <ProtectedRoute><Favourites /></ProtectedRoute>,
      },
      {
        path: 'admin',
        element: <ProtectedRoute isAdmin={true}><Admin /></ProtectedRoute>,
      },
      {
        path: 'admin/accommadationDetail',
        element: <ProtectedRoute isAdmin={true}><AccommodationDetail /></ProtectedRoute>,
      },
      {
        path: 'admin/bookings',
        element: <ProtectedRoute isAdmin={true}><BookingsAdminView /></ProtectedRoute>,
      },
      {
        path: 'admin/accommodations',
        element: <ProtectedRoute isAdmin={true}><AccommodationsAdminView /></ProtectedRoute>,
      },
      {
        path: 'admin/users',
        element: <ProtectedRoute isAdmin={true}><Users /></ProtectedRoute>,
      },
      {
        path: 'admin/user/:userId/edit',
        element: <ProtectedRoute isAdmin={true}><EditUser /></ProtectedRoute>,
      },
      {
        path: 'admin/accommodation/:accommodationId/edit',
        element: <ProtectedRoute isAdmin={true}><EditAccommodationByAdmin /></ProtectedRoute>,
      },
      {
        path: '/admin/accommodation/:accommodationId/details',
        element: <ProtectedRoute isAdmin={true}><AccommodationAdminDetails /></ProtectedRoute>,
      },
      {
        path: '/admin/user/:userId/details',
        element: <ProtectedRoute isAdmin={true}><User /></ProtectedRoute>,
      },
      {
        path: 'admin/createbooking',
        element: <ProtectedRoute isAdmin={true}><CreateBooking /></ProtectedRoute>,
      },
      {
        path: 'admin/booking/:bookingId/edit',
        element: <ProtectedRoute isAdmin={true}><EditBookingByAdmin /></ProtectedRoute>,
      },
      {
        path: 'booking/:bookingId/edit',
        element: <ProtectedRoute><EditBooking /></ProtectedRoute>,
      },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)