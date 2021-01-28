import {SERCH_USERS,GET_USER,GET_REPOS,SET_LOADING,CLEAR_USERS } from '../types';

//eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case SERCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading:false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading:false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading:false
            }
        case SET_LOADING:
            return {
                ...state,
                loading:true
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading:false
            }
        default:
            return state;
    }
}
