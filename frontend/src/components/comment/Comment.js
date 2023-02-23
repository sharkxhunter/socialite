import './Comment.css'

import CommentForm from './CommentForm'
import CommentBox from './CommentBox'

const Comment = ({ comments, postId }) => {
  return (
    <>
      <div className='comment'>
        <div className='commentWrapper'>
          <CommentForm postId={postId} />

          {comments.map((comment) => (
            <CommentBox key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Comment
