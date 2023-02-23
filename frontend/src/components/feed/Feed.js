import './Feed.css'
import Share from '../share/Share'
import Post from '../post/Post'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts, reset } from '../../features/posts/postSlice'
import Loader from '../Loader'

const Feed = ({ profileInfo }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { posts, isError, isSuccess, isLoading, errors } = useSelector(
    (state) => state.posts
  )

  const auth = useSelector((state) => state.auth)

  const { user } = auth

  useEffect(() => {
    if (!user) {
      // Check if logged in
      return navigate('/')
    }
  }, [user])

  useEffect(() => {
    dispatch(reset())

    dispatch(getAllPosts())
  }, [dispatch])

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {user && <Share />}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {!profileInfo ? (
              <>
                {posts.map((post) => (
                  <Post post={post} key={post._id} /> // Get All posts
                ))}
              </>
            ) : (
              <div>
                {posts
                  .filter((post) => post.user._id === profileInfo._id)
                  .map((post) => (
                    <Post post={post} key={post._id} /> // Get only users profile post
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Feed
