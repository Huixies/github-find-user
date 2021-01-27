import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    user:{},
    loading: false,
    alert: null,
    repos:[]
  }
  // async componentDidMount() {
  //   this.setState({loading:true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   console.log(res.data);
  //   this.setState({ users: res.data, loading: false });
  // }

  searchUsers = async text => {
    this.setState({ loading: true })
   
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  }

  getUser = async login => {
    this.setState({ loading: true })
   
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: res.data, loading: false });
  }

  getUserRepos = async login => { //用户仓库信息
    this.setState({ loading: true })
   
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=8&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ repos: res.data, loading: false });
  }
  
  clearUsers = () =>this.setState({ users: [],
    loading: false
  })
  
  setAlert = (msg,type) => {
    this.setState({ alert: { msg, type } });
    
    setTimeout(()=>this.setState({alert:null}),2000)
  }

  render() {
    const { users, user,repos, loading, alert } = this.state
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container' >
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    showClear={users.length > 0 ? true : false}
                    clearUsers={this.clearUsers}
                    searchUsers={this.searchUsers}
                    setAlert={this.setAlert}
                  />
                  <Users
                    loading={loading}
                    users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  user={user}
                  loading={loading}
                  getUserRepos={this.getUserRepos}
                  repos={repos}
                />
              )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

