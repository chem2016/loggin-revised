import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login } from './store'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  onSave = e => {
    e.preventDefault()
    this.props
      .login(this.state)
      .catch(({ response }) => this.setState({ error: response.data }))
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { onChange, onSave } = this
    const { email, password, error } = this.state
    return (
      <div className="h100 w100 flex column align-items-center justify-center">
        <h1>Let's Loggin'!</h1>
        <div className="flex w50">
          <img src="/loggin.png" />
          <form className="grow1" onSubmit={onSave}>
            <div className="flex column">
              <div className="flex column m1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="flex column m1">
                <label htmlFor="email">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  value={password}
                  onChange={onChange}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="m1">
                <button type="submit" className="btn bg-blue white p1 rounded">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
