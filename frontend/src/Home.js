import React, {Component} from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import superagent from 'superagent'

class Home extends Component {
  static async getInitialProps({req, res, match, history, location, ...ctx}) {
    return superagent
      .get('/!gitlab/api/v4/user')
      .then(r => ({user: r.body}))
      .catch(e => ({user: 'not signed in'}))
  }
  constructor() {
    super()
    this.state = {user: null}
  }
  componentDidMount() {
    console.log(this.props)
    superagent.get('/!gitlab/api/v4/user').then(r => this.setState({user: r.body}))
  }
  render() {
    const user = (this.state.user || this.props.user)
    return (
      <div>
        {(() => {
          if (user !== 'not signed in') {
            return (
              <button
                onClick={() => {
                  superagent.get('/!login/api/sign_out').then(r => {
                    window.location.replace('/login')
                  })
                }}
              >
                sign out
              </button>
            )
          }
        })()}
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    )
  }
}

export default Home