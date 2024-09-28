import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userName: '', password: '', showErrMsg: false, errMsg: ''}

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = jwToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errMsg => {
    this.setState({showErrMsg: true, errMsg})
  }

  submitData = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const api = 'https://apis.ccbp.in/login'
    const userDetails = {username: userName, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {userName, password, showErrMsg, errMsg} = this.state
    return (
      <div className="login-container">
        <div className="card-container">
          <img
            src="https://res.cloudinary.com/dieu9paow/image/upload/v1726927628/Layer_2_conc6u.png"
            alt="website login"
            className="login-image"
          />
          <div className="input-container">
            <img
              src="https://res.cloudinary.com/dieu9paow/image/upload/v1726928170/Standard_Collection_8_qekeeo.png"
              alt="website logo"
              className="insta-logo"
            />
            <h1 className="title">Insta Share</h1>
            <form className="user-input-card" onSubmit={this.submitData}>
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                className="username-input"
                id="username"
                onChange={this.onChangeUserName}
                value={userName}
              />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                className="username-input"
                id="password"
                onChange={this.onChangePassword}
                value={password}
              />
              {showErrMsg && <p className="error-msg">{errMsg}</p>}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
