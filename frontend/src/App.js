import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import Login from './screens/auth/Login'
import Register from './screens/auth/Register'

import NewsFeed from './screens/NewsFeed'
import Profile from './screens/Profile'
import EditProfile from './screens/EditProfile'
import SinglePost from './screens/SinglePost'

import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/newsfeed' element={<NewsFeed />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/profile/edit' element={<EditProfile />} />
            <Route path='/post/:id' element={<SinglePost />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
