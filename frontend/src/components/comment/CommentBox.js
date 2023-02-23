import moment from 'moment'

const CommentBox = ({ comment }) => {
  return (
    <div className='commentBox'>
      <img className='commentUserImg' src={comment.user.avatar} alt='' />
      <div className='commentText'>
        <p>
          <span className='commentUsername'>{comment.user.name}</span>
          {comment.text}
        </p>
        <small className='text-muted m-0 p-0 commentDate'>
          {moment(comment.createdAt).fromNow()}
        </small>
      </div>
    </div>
  )
}

export default CommentBox
