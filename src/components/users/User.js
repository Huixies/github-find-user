import React, { Fragment,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import moment from "moment";
import PropTypes from 'prop-types';


const User = ({ loading, repos, user, getUser, getUserRepos, match }) => {
   
    const { name, avatar_url, company, location, bio, blog, html_url, followers, following, public_repos, public_gists, created_at, updated_at, login } = user;
    const createdDate = moment(created_at).format('YYYY-MM-DD');
    const updatedDate = moment(updated_at).format('YYYY-MM-DD');
   
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login); 

    //eslint-disable-next-line
    },[])

    if (loading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <Link to='/' className='btn'
            style={{border:'1px solid #ccc'}}>return</Link>
            <a
                href={html_url}
                className='btn  my-1'
                style={{border:'1px solid #ccc'}}
            >github</a>
            
            <div className='card grid-2'>
                <div className='all-center'>
                    <img
                        src={avatar_url} 
                        style={{width:'150px'}}
                        alt="" />
                    <h2 style={{margin:'15px'}}>{name}</h2>
                
                </div>
                <div>
                    <ul>
                        <li>
                            <strong>登录名：</strong>
                            {login ? (<>{login}</>):('')}
                        </li>
                        <li>
                            <strong>简介：</strong>
                            {bio ? (<>{bio}</>):('未填')}
                        </li>
                        <li>
                            <strong>住址：</strong>
                            {location ? (<>{location}</>):('未填')}
                        </li>
                        <li>
                            <strong>公司：</strong>
                            {company ? (<>{company}</>):('未填')}
                        </li>
                        <li>
                            <strong>网址：</strong>
                            {blog ? (<>{blog}</>):('未填')}
                        </li>
                        <li>
                            <strong>创建日期：</strong>
                            {createdDate ? (<>{createdDate}</>):('')}
                        </li>
                        <li>
                            <strong>最近登录：</strong>
                            {updatedDate ? (<>{updatedDate}</>):('')}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className='badge badge-primary'>Followers:{followers}</div>
                <div className='badge badge-success'>Following:{following}</div>
                <div className='badge badge-light'>Public Repos:{public_repos}</div>
                <div className='badge badge-dark'>Public Gists:{public_gists}</div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    );   
}

User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired,
}
export default User;