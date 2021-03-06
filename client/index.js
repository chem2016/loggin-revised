import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import store, { sessionLogin } from './store'
import Login from './login'
import UserPage from './user-page'

class _Main extends Component {
  componentDidMount() {
    return this.props.sessionLogin()
  }

  render() {
    const { isLoggedIn } = this.props
    console.log('in index.js isLoggedIn: ', isLoggedIn)
    // why when we move the router to here works not in the ReactDom.render
    return (
      <Router>
        <Switch>
          {isLoggedIn && <Route path="/home" component={UserPage} />}
          {!isLoggedIn && <Route component={Login} />}
          <Redirect to="/home" />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    isLoggedIn: !!user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sessionLogin: () => dispatch(sessionLogin())
  }
}

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Main)

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
)
