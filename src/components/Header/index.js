import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'

import {MdMenu} from 'react-icons/md'
import {IoClose} from 'react-icons/io5'
import ReactContext from '../../context/reactContext'
import './index.css'

const Header = props => (
  <ReactContext.Consumer>
    {value => {
      const {
        activeOptionId,
        showMenuBar,
        showMenu,
        closeMenu,
        changeOptionToHome,
        changeOptionToProfile,
        changeOptionToSearch,
        changeSearchContainer,
      } = value

      const {userInput, changeUserInput, getSearchData} = props

      const onClickGetSearchData = () => {
        getSearchData()
      }
      const changeActiveOptionToHome = () => {
        changeOptionToHome()
      }
      const changeActiveOptionToSearch = () => {
        changeOptionToSearch()
        changeSearchContainer()
      }
      const changeActiveOptionToProfile = () => {
        changeOptionToProfile()
      }
      const openMenuContent = () => {
        showMenu()
      }
      const closeMenuContent = () => {
        closeMenu()
      }
      const homeClass =
        activeOptionId === 'home' ? 'selected-option' : 'normal-option'
      const searchClass =
        activeOptionId === 'search' ? 'selected-option' : 'normal-option'
      const profileClass =
        activeOptionId === 'profile' ? 'selected-option' : 'normal-option'

      const onChangeUserInput = event => {
        changeUserInput(event)
      }

      const onClickLogOut = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      return (
        <div>
          <nav className="nav-container">
            <div className="logo-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dieu9paow/image/upload/v1726928170/Standard_Collection_8_qekeeo.png"
                  alt="website logo"
                  className="header-logo"
                />
              </Link>
              <h1 className="logo-heading">Insta Share</h1>
            </div>
            <button
              type="button"
              className="menu-btn"
              onClick={openMenuContent}
            >
              <MdMenu size="30" />
            </button>

            <div className="lg-items-container">
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search Caption"
                  className="search-input"
                  value={userInput}
                  onChange={onChangeUserInput}
                />

                <button
                  testid="searchIcon"
                  type="button"
                  className="search-btn"
                  onClick={onClickGetSearchData}
                >
                  <FaSearch size="20" />
                </button>
              </div>
              <Link to="/">
                <button
                  type="button"
                  className={homeClass}
                  onClick={changeActiveOptionToHome}
                >
                  Home
                </button>
              </Link>
              <Link to="/my-profile">
                <button
                  type="button"
                  className={profileClass}
                  onClick={changeActiveOptionToProfile}
                >
                  Profile
                </button>
              </Link>
              <button
                type="button"
                className="logout-btn"
                onClick={onClickLogOut}
              >
                Logout
              </button>
            </div>
          </nav>
          {showMenuBar && (
            <div className="sm-menu-container">
              <ul className="ul-container">
                <Link to="/">
                  <li>
                    <button
                      type="button"
                      className={homeClass}
                      onClick={changeActiveOptionToHome}
                    >
                      Home
                    </button>
                  </li>
                </Link>

                <li>
                  <button
                    type="button"
                    className={searchClass}
                    onClick={changeActiveOptionToSearch}
                  >
                    Search
                  </button>
                </li>

                <Link to="/my-profile">
                  <li>
                    <button
                      className={profileClass}
                      type="button"
                      onClick={changeActiveOptionToProfile}
                    >
                      Profile
                    </button>
                  </li>
                </Link>
                <li>
                  <button
                    type="button"
                    className="logout-btn"
                    onClick={onClickLogOut}
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <button
                    className="btn"
                    type="button"
                    onClick={closeMenuContent}
                  >
                    <IoClose size="20" color="#ffffff" />
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )
    }}
  </ReactContext.Consumer>
)
export default withRouter(Header)
