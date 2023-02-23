import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarlistItem'>
            <i className='fas fa-rss'></i>
            <span className='sidebarListItemText'>Feed</span>
          </li>
          <li className='sidebarlistItem'>
            <i className='fas fa-chart-area'></i>
            <span className='sidebarListItemText'>Chart</span>
          </li>
          <li className='sidebarlistItem'>
            <i className='fas fa-video'></i>
            <span className='sidebarListItemText'>Video</span>
          </li>
          <li className='sidebarlistItem'>
            <i className='fas fa-layer-group'></i>
            <span className='sidebarListItemText'>Group</span>
          </li>
          <li className='sidebarlistItem'>
            <i className='fas fa-bookmark'></i>
            <span className='sidebarListItemText'>Bookmarks</span>
          </li>
          <li className='sidebarlistItem'>
            <i className='fas fa-question-circle'></i>
            <span className='sidebarListItemText'>Questions</span>
          </li>
          <li className='sidebarlistItem'>
            <i className='fas fa-briefcase'></i>
            <span className='sidebarListItemText'>Jobs</span>
          </li>
          <li className='sidebarlistItem'>
            <i className='fas fa-calendar'></i>
            <span className='sidebarListItemText'>Events</span>
          </li>
          <li className='sidebarlistItem'>
            <i className='fas fa-graduation-cap'></i>
            <span className='sidebarListItemText'>Courses</span>
          </li>
        </ul>

        <button className='sidebarButton'>Show more</button>
        <hr className='sidebarHr' />

        <ul className='sidebarFriendList'>
          <li className='sidebarFriend'>
            <img
              className='sidebarFriendImg'
              src='https://randomuser.me/api/portraits/women/79.jpg'
              alt=''
            />
            <span className='sidebarFriendName'>Jane Doe</span>
          </li>
          <li className='sidebarFriend'>
            <img
              className='sidebarFriendImg'
              src='https://randomuser.me/api/portraits/men/79.jpg'
              alt=''
            />
            <span className='sidebarFriendName'>John Doe</span>
          </li>
          <li className='sidebarFriend'>
            <img
              className='sidebarFriendImg'
              src='https://randomuser.me/api/portraits/women/80.jpg'
              alt=''
            />
            <span className='sidebarFriendName'>Karren Doe</span>
          </li>
          <li className='sidebarFriend'>
            <img
              className='sidebarFriendImg'
              src='https://randomuser.me/api/portraits/women/90.jpg'
              alt=''
            />
            <span className='sidebarFriendName'>Chitchat Amel</span>
          </li>
          <li className='sidebarFriend'>
            <img
              className='sidebarFriendImg'
              src='https://randomuser.me/api/portraits/women/85.jpg'
              alt=''
            />
            <span className='sidebarFriendName'>Jup Doe</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
