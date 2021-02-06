import React, { useContext } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/githubContext';


const Users = () => {
    const githubContext = useContext(GithubContext);
    const { loading, users } = githubContext;

    if (loading) {
        return <Spinner />
    } else {
        return (
        <div className='users1 users2'>
            {users.map(user => 
               <UserItem key={user.id} user={user}/>
            )
            }
        </div>
    )
    }
    
}



    




export default Users;

