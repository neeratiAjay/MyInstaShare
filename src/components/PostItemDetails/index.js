import {withRouter, Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import ReactContext from '../../context/reactContext'

import './index.css'

const PostItemDetails = props => (
  <ReactContext.Consumer>
    {value => {
      const {userData, initialLikePostApi} = props

      const {
        comments,
        createdAt,
        postDetails,
        postId,
        likesCount,
        profilePic,
        userId,
        userName,
        message,
      } = userData

      const {caption, imageUrl} = postDetails

      const isLiked = message === 'Post has been liked'

      const postLike = () => {
        initialLikePostApi(postId, true)
      }
      const postUnLike = () => {
        initialLikePostApi(postId, false)
      }

      return (
        <li key={userName} className="post-container">
          <Link to={`/user/${userId}`} className="link">
            <div className="name-profile-container">
              <img
                key={profilePic}
                src={profilePic}
                alt="post author profile"
                className="profile-pic-mini"
              />
              <p className="user-name-mini">{userName}</p>
            </div>
          </Link>
          <img
            src={imageUrl}
            alt="post"
            className="post-image"
            key={imageUrl}
          />
          <div className="name-profile-container">
            {isLiked ? (
              <button
                type="button"
                className="like-btn"
                onClick={postUnLike}
                testid="unLikeIcon"
              >
                <FcLike size="23" />
              </button>
            ) : (
              <button
                type="button"
                className="like-btn"
                onClick={postLike}
                testid="likeIcon"
              >
                <BsHeart size="20" />
              </button>
            )}
            <button type="button" className="like-btn" testid="likeIcon">
              <FaRegComment size="20" />{' '}
            </button>
            <button type="button" className="like-btn">
              <BiShareAlt size="20" />{' '}
            </button>
          </div>
          <p className="likes-count">{likesCount} likes</p>
          <p className="caption">{caption}</p>

          <ul className="comments-container-ul">
            {comments.map(eachItem => (
              <li key={eachItem.userId} className="list-comment">
                <Link to={`user/${eachItem.userId}`} className="likes-count">
                  <span className="likes-count">{eachItem.userName}</span>
                </Link>
                <p key={eachItem.userId} className="caption">
                  {eachItem.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="created-text" key={createdAt}>
            {createdAt}
          </p>
        </li>
      )
    }}
  </ReactContext.Consumer>
)
export default withRouter(PostItemDetails)
