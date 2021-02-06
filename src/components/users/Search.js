import React,{useState,useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/github/githubContext';

const Search =()=> { 
    const alertContext = useContext(AlertContext);
    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');   
    const onChange = e => {
        setText(e.target.value);
    };
    const onSubmit= e => {
        e.preventDefault(); //不要执行相关事件的默认动作
        
        if (text === '') {
            alertContext.showAlert('Please enter something', 'light');
        } else {
            githubContext.searchUsers(text);
            setText('')
        }
    }
    return (
        <div>
            <form
                onSubmit={onSubmit} className='form'
            >
            <input
                type="text"
                name="text"placeholder='github user name'
                value={text}
                onChange={onChange}
            />
            <input
                type="submit"
                value='搜索'
                className='btn btn-dark btn-block'
            />
            </form>
            {githubContext.users.length > 0 && (
                <button
                    className='btn btn-light btn-block' onClick={githubContext.clearUsers}
                >
                    Clear
                </button>
            ) 
            }
           
        </div>
    );
    
}

export default Search;