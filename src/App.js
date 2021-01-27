import React, { useState, Fragment } from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);
  
  // async componentDidMount() {
  //   this.setState({loading:true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   console.log(res.data);
  //   this.setState({ users: res.data, loading: false });
  // }

  const searchUsers = async text => {
    setLoading(true)
   
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items);
    setLoading(false)
  }

  const getUser = async login => {
    setLoading(true)
   
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false)
  }

  const getUserRepos = async login => { //用户仓库信息
    setLoading(true)
   
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=8&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false)
  }
  
  const clearUsers = () => {
    setUsers([]);
    setLoading(false)
  }
  
  const showAlert = (msg,type) => {
    setAlert( {msg, type});
    
    setTimeout(()=>setAlert(null),2000)
  }

   
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
                    clearUsers={clearUsers}
                    searchUsers={searchUsers}
                    setAlert={showAlert}
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
                  getUser={getUser}
                  user={user}
                  loading={loading}
                  getUserRepos={getUserRepos}
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

export default App;

