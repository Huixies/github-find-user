import React, { Fragment,useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import moment from "moment";
import GithubContext from '../../context/github/githubContext';


const User = ({ match }) => {
    const githubContext = useContext(GithubContext);
    const { getUser, loading, user,repos,getUserRepos } = githubContext;

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
                style={{ border: '1px solid #ccc',background:'white' }}>
                <i className='fa fa-reply color1'/>
                </Link>
            <a
                href={html_url}
                className='btn my-1'
                style={{border:'1px solid #ccc',background:'white'}}
            >
                <i className='fa fa-github color1'/>
                </a>
            
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
                        <i className='fa fa-user-o'/> &nbsp;
                            <span>登录名：</span>
                            {login ? (<>{login}</>):('')}
                        </li>
                        <li>
                        <i className='fa fa-pencil-square-o'/> &nbsp;
                            <span>简介：</span>
                            {bio ? (<>{bio}</>):('未填')}
                        </li>
                        <li>
                        <i className='fa fa-home'/> &nbsp;
                            <span>住址：</span>
                            {location ? (<>{location}</>):('未填')}
                        </li>
                        <li>
                        <i className='fa fa-university'/> &nbsp;
                            <span>公司：</span>
                            {company ? (<>{company}</>):('未填')}
                        </li>
                        <li>
                        <i className='fa fa-at'/> &nbsp;
                            <span>网址：</span>
                            {blog ? (<>{blog}</>):('未填')}
                        </li>
                        <li>
                        <i className='fa fa-clock-o'/> &nbsp;
                            <span>创建日期：</span>
                            {createdDate ? (<>{createdDate}</>):('')}
                        </li>
                        <li>
                        <i className='fa fa-window-restore'/> &nbsp;
                            <span>最近登录：</span>
                            {updatedDate ? (<>{updatedDate}</>):('')}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className='badge badge-primary color2'>Followers:{followers}</div>
                <div className='badge badge-success color2'>Following:{following}</div>
                <div className='badge badge-light color2'>Public Repos:{public_repos}</div>
                <div className='badge badge-dark color2'>Public Gists:{public_gists}</div>
            </div>
            <div>最近项目</div>
            <Repos repos={repos} />
        </Fragment>
    );   
}


export default User;