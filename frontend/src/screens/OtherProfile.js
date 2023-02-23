import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Card, Image, Form, Button } from 'react-bootstrap'

import { getSingleUser } from '../features/auth/authSlice'

import ProfilePosts from '../components/profile/ProfilePosts'
import Loader from '../components/Loader'
import Message from '../components/Message'

import moment from 'moment'

const Profile = () => {
  const { id } = useParams() // get the id for url parameter

  const dispatch = useDispatch()

  const { user, isLoading, errors, profile } = useSelector(
    (state) => state.auth
  )

  const navigate = useNavigate()

  useEffect(() => {
    if ((!user || !user.token) && !isLoading) {
      // Check if logged in
      return navigate('/')
    }

    dispatch(getSingleUser(id))
  }, [dispatch, user])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errors ? (
        <Message variant={'danger'}>{errors}</Message>
      ) : profile && profile.errors ? (
        <Message variant={'danger'}>
          {user.errors.includes('Cast to ObjectId failed')
            ? 'Server Error'
            : 'User not found'}
        </Message>
      ) : (
        <>
          <Card>
            <Card.Body>
              <div className='profile-info text-center'>
                <Image
                  src={profile && profile.avatar}
                  className='img-thumbnail border-round'
                  width='230'
                  height='230'
                />

                <div className='profile-name'>
                  <h5>{profile && profile.name}</h5>
                  <small className='text-muted'>
                    @{profile && profile.email}
                  </small>
                </div>

                <Form className='d-inline-block'>
                  <Button variant='success' className='btn btn-sm mt-1'>
                    Follow
                  </Button>
                </Form>

                <div className='d-flex justify-content-center mt-1'>
                  <div className='w-75'>
                    <p>{profile && profile.bio}</p>
                  </div>
                </div>

                {profile && profile.url && (
                  <div className='d-flex justify-content-center pb-3'>
                    <div>
                      <Link to={profile && profile.url}>
                        <i class='fas fa-globe'></i>
                      </Link>
                    </div>
                  </div>
                )}

                <div className='secondary-info'>
                  {profile && profile.contact && (
                    <p>
                      <i className='fas fa-phone text-success'></i>
                      {profile && profile.contact}
                    </p>
                  )}

                  {profile && profile.studied && (
                    <p>
                      <i className='fas fa-book text-danger'></i>
                      {profile && profile.studied}
                    </p>
                  )}

                  {profile && profile.position && (
                    <p>
                      <i className='fas fa-poll text-warning'></i>
                      {profile && profile.position}
                    </p>
                  )}

                  {profile && profile.job && (
                    <p>
                      <i className='fas fa-briefcase text-info'></i>
                      {profile && profile.job}
                    </p>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>

          <Row className='d-flex justify-content-center'>
            <Col md={6}>
              <div className='post'>
                <div className='info'>
                  <img
                    className='profile-pic img-fluid border-rounded'
                    src='https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg'
                    alt=''
                  />
                  <span className='username'>Username</span>
                </div>
                <img
                  src='https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg'
                  className='post-image'
                  alt=''
                />
                <div className='post-content'>
                  <div className='reaction-wrapper'>
                    <div className='d-flex align-items-center'>
                      <i className='fas fa-thumbs-up'></i>
                      <span className='ms-2 font-sm'>1,012 likes</span>
                    </div>
                  </div>
                  <p className='description'>
                    <span>Username </span> Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Fugit, inventore!
                  </p>
                  <p className='post-time'>3 mins ago</p>
                </div>
                <div className='comment-wrapper px-3'>
                  <input
                    type='text'
                    className='comment-box'
                    placeholder='Add a comment'
                  />
                  <button className='comment-btn'>post</button>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default Profile
