const ProfilePosts = () => {
  return (
    <>
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
            <span>Username </span> Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Fugit, inventore!
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
    </>
  )
}

export default ProfilePosts
