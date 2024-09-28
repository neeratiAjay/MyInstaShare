import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'
import ReactContext from './context/reactContext'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import './App.css'

class App extends Component {
  state = {
    activeOptionId: 'home',
    showMenuBar: false,
    userInput: '',
    showSearhContent: false,
    likedData: [],
  }

  showMenu = () => {
    this.setState({showMenuBar: true})
  }

  closeMenu = () => {
    this.setState({showMenuBar: false})
  }

  changeHomeOption = () => {
    this.setState({activeOptionId: 'home'})
  }

  changeProfileOption = () => {
    this.setState({activeOptionId: 'profile'})
  }

  changeSearchOption = () => {
    this.setState({activeOptionId: 'search'})
  }

  updateSearchContainer = () => {
    this.setState(prev => ({
      showSearhContent: !prev.showSearhContent,
    }))
  }

  render() {
    const {
      activeOptionId,
      showMenuBar,
      userInput,
      showSearhContent,
      likedData,
    } = this.state

    return (
      <ReactContext.Provider
        value={{
          likedData,
          showSearhContent,
          userInput,
          showMenuBar,
          activeOptionId,
          showMenu: this.showMenu,
          closeMenu: this.closeMenu,
          changeSearchContainer: this.updateSearchContainer,
          changeOptionToHome: this.changeHomeOption,
          changeOptionToProfile: this.changeProfileOption,
          changeOptionToSearch: this.changeSearchOption,
          likePost: this.onClickLikePost,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/user/:id" component={UserProfile} />
          <ProtectedRoute exat path="/my-profile" component={MyProfile} />
          <Route exact path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App

/*
 onClickLikePost = data => {
    const {userData} = data
    const {postId, likesCount} = userData
    const incrementLikes = parseInt(likesCount) + 1
    const {likedData} = this.state
    const findItem = likedData.find(eachItem => eachItem.postId === postId)

    if (findItem === undefined) {
      this.setState(prevState => ({
        likedData: [
          ...prevState.likedData,
          {...userData, likesCount: incrementLikes},
        ],
      }))
    } else {
      this.setState(prevState => ({
        likedData: prevState.likedData.map(eachItem => {
          if (eachItem.postId === postId) {
            const {likesCount} = eachItem
            const decrementCount = parseInt(likesCount) - 1
            return {...eachItem, likesCount: decrementCount}
          }
          return eachItem
        }),
      }))
    }
  }
*/
