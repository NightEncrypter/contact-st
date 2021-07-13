/* eslint-disable import/no-anonymous-default-export */
import { CLEAR_ERRORS, LOADED_USERS, LOADED_ERROR, REG_FAIL, REG_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS,LOGOUT } from '../types';

export default (state, action) => {
	switch (action.type) {

		case LOADED_USERS:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};
		case LOGIN_SUCCESS:
		case REG_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
	
		case REG_FAIL:
	    case LOGIN_FAIL:
		case LOADED_ERROR:
		case LOGOUT:

			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: null,
				loading: false,
                error: action.payload,
                user: null,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
