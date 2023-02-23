import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Container, Col } from 'react-bootstrap'
import Post from '../components/post/Post'
import Sidebar from '../components/sidebar/Sidebar'
import Rightbar from '../components/rightbar/Rightbar'
import Comment from '../components/comment/Comment'
import { getSinglePost, reset } from '../features/posts/postSlice'

import Loader from '../components/Loader'
import Message from '../components/Message'

const SinglePost = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const { post, isLoading, isError, errors } = useSelector(
    (state) => state.posts
  )

  useEffect(() => {
    dispatch(reset())

    dispatch(getSinglePost(id))
  }, [])

  return (
    <Row>
      <Col className='d-sm-none d-md-block d-sm-block' md={3}>
        <Sidebar />
      </Col>

      <Col sm={12} md={6} lg={6}>
        {isLoading ? (
          <Loader />
        ) : isError && errors ? (
          <Message variant={'danger'}>{errors}</Message>
        ) : (
          <>
            {post && <Post post={post} />}
            {post && <Comment postId={post._id} comments={post.comments} />}
          </>
        )}
      </Col>

      <Col className='d-sm-none d-md-block d-sm-block' md={3}>
        <Rightbar profileInfo={null} users={null} />
      </Col>
    </Row>
  )
}

export default SinglePost
