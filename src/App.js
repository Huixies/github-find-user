import React from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import './App.css';
import AlertState from './context/alert/alertState';
import GithubState from './context/github/githubState';

const App = () => {
  // async componentDidMount() {
  //   this.setState({loading:true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   console.log(res.data);
  //   this.setState({ users: res.data, loading: false });
  // }
  return (
    <AlertState>
      <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container' >
            <Alert />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
        </Router>
        </GithubState>
      </AlertState>
    )
}

export default App;

