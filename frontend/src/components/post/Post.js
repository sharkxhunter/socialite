import './Post.css'
import like from '../../img/like.png'
import heart from '../../img/heart.png'
import moment from 'moment'

import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { deletePost } from '../../features/posts/postSlice'

const Post = ({ post }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  const [likes, setLikes] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.token))
  const [commentsCount, setCommentsCount] = useState(post.comments.length)

  const likeHandler = () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      axios.put(
        '/api/posts/' + post._id + '/like',
        { userId: user._id },
        config
      )
    } catch (err) {}
    setLikes(isLiked ? likes - 1 : likes + 1)
    setIsLiked(!isLiked)
  }

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${post.user._id}`}>
              <img className='postProfileImg' src={post.user.avatar} alt='' />
            </Link>
            <div className='postTopLeftText'>
              <span className='postUsername'>{post.user.name}</span>
              <span className='postDate text-muted'>
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <div className='postTopRight'>
            {user && post.user._id.toString() === user._id.toString() && (
              <div className='dropdown'>
                <button
                  className='btn'
                  type='button'
                  id='dropdownMenuButton1'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  <i className='fas fa-ellipsis-v'></i>
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton1'>
                  <li
                    onClick={() => {
                      dispatch(deletePost(post._id))
                    }}>
                    <a className='dropdown-item' href='#'>
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post.text}</span>
          {post && post.image && (
            <img className='img-fluid postImg' src={post.image} alt='' />
          )}
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img className='likeIcon' src={like} onClick={likeHandler} alt='' />
            <img
              className='likeIcon'
              src={heart}
              onClick={likeHandler}
              alt=''
            />
            <div className='postLikeCounter'>{likes} people liked it</div>
          </div>
          <div className='postBottomRight'>
            <Link to={`/post/${post._id}`} className='text-decoration-none'>
              <i className='fas fa-comment-alt'></i> {commentsCount} comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
