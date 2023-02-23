import Sidebar from '../components/sidebar/Sidebar'
import Feed from '../components/feed/Feed'
import Rightbar from '../components/rightbar/Rightbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'

const NewsFeed = () => {
  const navigate = useNavigate()

  const auth = useSelector((state) => state.auth)

  const { user, isLoading } = auth

  const dispatch = useDispatch()

  const users = useSelector((state) => state.auth.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    if (!user) {
      // Check if logged in
      return navigate('/')
    }
  }, [user])

  return (
    <div>
      <Row>
        <Col className='d-sm-none d-md-block d-sm-block' md={3}>
          <Sidebar />
        </Col>

        <Col sm={12} md={6} lg={6}>
          <Feed />
        </Col>

        <Col className='d-sm-none d-md-block d-sm-block' md={3}>
          <Rightbar profileInfo={null} users={users} />
        </Col>
      </Row>
    </div>
  )
}

export default NewsFeed
