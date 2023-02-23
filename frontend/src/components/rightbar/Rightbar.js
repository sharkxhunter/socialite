import './Rightbar.css'
import gift from '../../img/gift.png'

import { Link } from 'react-router-dom'

const Rightbar = ({ profileInfo, users }) => {
  const HomeRightBar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src={gift} alt='' />
          <span className='birthdayText'>
            <strong>Pola Foster</strong> and <strong>3 other friends</strong>{' '}
            have a birhday today.
          </span>
        </div>
        <img
          className='rightbarAd'
          src='https://images.pexels.com/photos/1058276/pexels-photo-1058276.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          alt='ads'
        />
        <h4 className='rightbarTitle mb-3'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {users &&
            users.map((user) => (
              <li className='rightbarFriend' key={user._id}>
                <div className='rightbarProfileImgContainer'>
                  <Link to={`/profile/${user._id}`}>
                    <img
                      className='rightbarProfileImg'
                      src={user.avatar}
                      alt=''
                    />
                    <span className='rightbarOnline'></span>
                  </Link>
                </div>
                <div className='rightbarUsername'>{user.name}</div>
              </li>
            ))}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Contact: </span>
            <span className='rightbarInfoKey'>
              {profileInfo.contact && profileInfo.contact.phone}
            </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Studied: </span>
            <span className='rightbarInfoKey'>
              {profileInfo && profileInfo.studied}
            </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Job: </span>
            <span className='rightbarInfoKey'>
              {profileInfo && profileInfo.job}
            </span>
          </div>
        </div>

        <h4 className='rightbarTitle'>User Friends</h4>
        <div className='rightbarFollowings'>
          <div className='rightbarFollowing'>
            <img
              src='https://randomuser.me/api/portraits/men/90.jpg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>John Doe</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              src='https://randomuser.me/api/portraits/men/91.jpg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>Kart Doe</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              src='https://randomuser.me/api/portraits/women/94.jpg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>Karen Poy</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              src='https://randomuser.me/api/portraits/women/80.jpg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>Karla Mont</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              src='https://randomuser.me/api/portraits/men/80.jpg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>Michael Adhin</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              src='https://randomuser.me/api/portraits/women/75.jpg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>Jessica Low</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {profileInfo ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}

export default Rightbar
