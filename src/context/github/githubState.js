import { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {SERCH_USERS,GET_USER,GET_REPOS,SET_LOADING,CLEAR_USERS} from '../types';

const githubState = props => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
        repos: []
    };

    let githubClientId;
    let githubClientSecret;

    if (process.env.NODE_ENV !== 'production') {
        //使用本地环境变量
        githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
        githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
    } else {
        //生产环境
        githubClientId = process.env.GITHUB_CLIENT_ID
        githubClientSecret = process.env.GITHUB_CLIENT_SECRET
    }



    //eslint-disable-next-line
    const [state,dispatch]=useReducer(GithubReducer,initialState)

    //search users
    const searchUsers = async text => {
        setLoading()
       
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        
        dispatch({
            type: SERCH_USERS,
            payload:res.data.items
        })
    }
    //get user
    const getUser = async login => {
        setLoading()
       
        const res = await axios.get(`https://api.github.com/users/${login}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);

        dispatch({type:GET_USER,payload:res.data})
      }
    //get repos
    const getUserRepos = async login => { //用户仓库信息
        setLoading()
       
        const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=8&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        
        dispatch({type:GET_REPOS,payload:res.data})
    }

    //clear users
    const clearUsers = () => dispatch({type:CLEAR_USERS})

    //set loading
    const setLoading = () => dispatch({type:SET_LOADING})

    return (
        <GithubContext.Provider
            value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos
        }}
        >
            {props.children}
        </GithubContext.Provider>
    )
}

export default githubState
