import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'

import { Image } from 'react-bootstrap'
const NavigationBar = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const auth = useSelector((state) => state.auth)

  const { user, isLoading } = auth

  useEffect(() => {
    if (!user || !user.token) {
      // Check if logged in
      return navigate('/')
    }
  }, [user])

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-info w-100'>
        <Container>
          <Link className='navbar-brand' to={user ? '/newsfeed' : '/'}>
            <span>Socialite</span>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              {user && (
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link'
                    href='#'
                    id='navbarDropdown'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    <Image src={user && user.avatar} className='navbarAvatar' />
                    <span className='ms-2 text-white'>{user.name}</span>
                  </a>
                  <ul
                    className='dropdown-menu dropdown-menu-end'
                    aria-labelledby='navbarDropdown'>
                    <li>
                      <Link
                        className='dropdown-item'
                        to={user ? `/profile/${user._id}` : '/'}>
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li onClick={logoutHandler}>
                      <a className='dropdown-item' href='#!'>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </Container>
      </nav>
    </>
  )
}

export default NavigationBar
