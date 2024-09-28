import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import PostItemDetails from '../PostItemDetails'
import Stories from '../Stories'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ReactContext from '../../context/reactContext'
import './index.css'

const initialApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    postsData: [],

    apiStatus: initialApiStatus.initial,

    userInput: '',
  }

  componentDidMount() {
    this.getPostsData()
  }

  formattedPostData = eachItem => ({
    comments: eachItem.comments.map(eachComment => ({
      userId: eachComment.user_id,
      userName: eachComment.user_name,
      comment: eachComment.comment,
    })),
    createdAt: eachItem.created_at,
    isLiked: false,
    likesCount: eachItem.likes_count,
    postDetails: {
      caption: eachItem.post_details.caption,
      imageUrl: eachItem.post_details.image_url,
    },
    postId: eachItem.post_id,
    profilePic: eachItem.profile_pic,
    userId: eachItem.user_id,
    userName: eachItem.user_name,
  })

  postLikeApi = async (postId, likeStatus) => {
    const {postsData} = this.state
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const jwtToken = Cookies.get('jwt_token')
    const likeObject = {
      like_status: likeStatus,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Berear ${jwtToken}`,
      },
      body: JSON.stringify(likeObject),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    let searchPostsData = postsData

    searchPostsData = searchPostsData.map(eachObject => {
      if (eachObject.postId === postId && likeStatus) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount + 1,
        }
      }
      if (eachObject.postId === postId && !likeStatus) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount - 1,
        }
      }

      return eachObject
    })
    this.setState({postsData: searchPostsData})
  }

  getPostsData = async () => {
    this.setState({apiStatus: initialApiStatus.inProgress})
    const {userInput} = this.state
    const api = `https://apis.ccbp.in/insta-share/posts?search=${userInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Berear ${jwtToken}`,
      },
    }
    const postsResponse = await fetch(api, options)
    const postsData = await postsResponse.json()

    if (postsResponse.ok) {
      const updatedPostsData = postsData.posts.map(eachItem =>
        this.formattedPostData(eachItem),
      )
      this.setState({
        postsData: updatedPostsData,
        apiStatus: initialApiStatus.success,
      })
    } else {
      this.setState({apiStatus: initialApiStatus.failure})
    }
  }

  changeSearchInput = event => {
    this.setState({userInput: event.target.value})
  }

  onClickGetSearchData = () => {
    this.getPostsData()
  }

  noResultFound = () => (
    <div className="no-results-container">
      <img
        src="https://res.cloudinary.com/dieu9paow/image/upload/v1727023811/Group_npwvm6.png"
        alt="search not found"
        className="no-results-image"
      />
      <h1 className="no-results-heading">Search Not Found</h1>
      <p className="no-results-para">Try different keyword or search again</p>
    </div>
  )

  renderSuccessView = () => {
    const {postsData, userInput} = this.state
    const countItems = postsData.length

    return (
      <ReactContext.Consumer>
        {value => {
          const {showSearhContent} = value

          return (
            <div className="flex-column-container">
              {showSearhContent && (
                <div className="home-input-container">
                  <input
                    type="search"
                    placeholder="Search Caption"
                    className="search-input-home"
                    value={userInput}
                    onChange={this.changeSearchInput}
                  />
                  <button
                    testid="searchIcon"
                    type="button"
                    className="search-btn-home"
                    onClick={this.onClickGetSearchData}
                  >
                    <FaSearch size="20" />
                  </button>
                </div>
              )}
              {countItems === 0 ? (
                this.noResultFound()
              ) : (
                <ul className="posts-list-container">
                  {postsData.map(eachItem => (
                    <PostItemDetails
                      initialLikePostApi={this.postLikeApi}
                      userData={eachItem}
                      key={eachItem.postId}
                    />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  onClickRetry = () => {
    this.getPostsData()
  }

  renderFailureView = () => (
    <div className="home-failure-container">
      <img
        src="https://res.cloudinary.com/dieu9paow/image/upload/v1727069595/alert-triangle_cq0jwj.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something went wrong. Please try again</h1>
      <button type="button" className="failure-btn" onClick={this.onClickRetry}>
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderDisplayView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initialApiStatus.inProgress:
        return this.renderLoadingView()
      case initialApiStatus.success:
        return this.renderSuccessView()
      case initialApiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {userInput} = this.state
    return (
      <>
        <Header
          userInput={userInput}
          changeUserInput={this.changeSearchInput}
          getSearchData={this.onClickGetSearchData}
        />
        <Stories />
        <hr className="line" />
        <div className="home-container">{this.renderDisplayView()}</div>
      </>
    )
  }
}
export default Home
// <div className="home-container">{this.renderDisplayView()}</div>
