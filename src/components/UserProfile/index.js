import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'
import './index.css'

const initialApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {userProfileData: [], apiStatus: initialApiStatus.initial}

  componentDidMount() {
    this.getUserData()
  }

  getUserData = async () => {
    this.setState({apiStatus: initialApiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/insta-share/users/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Berear ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        stories: data.user_details.stories.map(eachStory => ({
          id: eachStory.id,
          image: eachStory.image,
        })),
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
      }

      this.setState({
        userProfileData: formattedData,
        apiStatus: initialApiStatus.success,
      })
    } else {
      this.setState({apiStatus: initialApiStatus.failure})
    }
  }

  onClickRetry = () => {
    this.getUserData()
  }

  renderSuccessView = () => {
    const {userProfileData} = this.state

    const {
      followersCount,
      followingCount,
      id,
      posts,
      postsCount,
      profilePic,
      stories,
      userBio,
      userId,
      userName,
    } = userProfileData
    let lenthOfPosts = null
    if (posts) {
      lenthOfPosts = posts.length
    }

    return (
      <div className="success-view-container" key={id}>
        <div className="profile-container">
          <div className="sm-name-container">
            <p className="user-name-sm">{userName}</p>
            <img
              src={profilePic}
              alt="user profile"
              className="user-profile-image"
            />
          </div>
          <div className="user-details-container">
            <p className="user-name-lg">{userName}</p>
            <div className="followers-container">
              <div className="count-text-container">
                <p className="popsts-count">{postsCount}</p>
                <p className="posts-text">posts</p>
              </div>
              <div className="count-text-container">
                <p className="popsts-count">{followersCount}</p>
                <p className="posts-text">followers</p>
              </div>

              <div className="count-text-container">
                <p className="popsts-count">{followingCount}</p>
                <p className="posts-text">following</p>
              </div>
            </div>
            <div className="user-bio-container-lg">
              <p className="user-id-lg">{userId}</p>
              <p className="user-bio-lg">{userBio}</p>
            </div>
          </div>
        </div>
        <div className="user-bio-container-sm">
          <p className="user-id">{userId}</p>
          <p className="bio-text">{userBio}</p>
        </div>
        <div className="user-stories-container">
          {stories?.map(eachStory => (
            <img
              src={eachStory.image}
              key={eachStory.id}
              alt="user story"
              className="user-story-img"
            />
          ))}
        </div>
        <hr className="line" />
        <div className="grid-icon-container">
          <BsGrid3X3 size="20" />
          <p className="posts-text-grid">Posts</p>
        </div>
        <div className="posts-images-container">
          {lenthOfPosts === 0 ? (
            <div className="empty-posts-container">
              <div className="circle">
                <BiCamera size="20" />
                <p className="no-posts-text">No Posts Yet</p>
              </div>
            </div>
          ) : (
            <div className="non-empty-posts-container">
              {posts?.map(eachPost => (
                <img
                  key={eachPost.id}
                  src={eachPost.image}
                  alt="user post"
                  className="user-post-image"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  renderLodingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="render-failure-container">
      <img
        src="https://res.cloudinary.com/dieu9paow/image/upload/v1727023994/Group_7737_fbqgcm.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button onClick={this.onClickRetry} className="retry-btn">
        Try agian
      </button>
    </div>
  )

  renderDisplayView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initialApiStatus.inProgress:
        return this.renderLodingView()
      case initialApiStatus.success:
        return this.renderSuccessView()
      case initialApiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderDisplayView()}
      </div>
    )
  }
}
export default UserProfile
