import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import axios from 'axios';

// import AuthReducer from './authReducer';
import AuthContext from './authContext';
import setAuthToken from '../../utils/setAuthToken';
import { LOADED_USERS, REG_SUCCESS, REG_FAIL, LOGIN_SUCCESS, LOADED_ERROR, LOGIN_FAIL, CLEAR_ERRORS,LOGOUT } from '../types';

const AuthState = (props) => {
	const initialState = {
		// access browser token
		token: localStorage.getItem('token'),

		// this tell us user logged-in or not
		isAuthenticated: null,
		// before we fetch
		loading: true,
		user: null,
		// if we get errors
		error: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	// load users : checking users logged in
	// GET DATA OF USER
	const loadUsers = async () => {

		// console.log(localStorage.token);
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');

			// console.log(res);

			dispatch({
				type:LOADED_USERS,
				payload: res.data,
			});

		} catch (err) {
			// console.log(err);
			dispatch({
				type: LOADED_ERROR,

				payload: err.response.data.msg,
			});

		}

	
	};

	// Register user:sign user up get token back
	const registerUser = async (regData) => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/users', regData, config);

			// console.log(res.data);
			dispatch({
				type: REG_SUCCESS,
				payload: res.data,
			});

			loadUsers();
		} catch (error) {
			// console.log(error);
			dispatch({
				type: REG_FAIL,
				payload: error.response.data.msg,
			});
		}
	};



	// Login user :log the user and get token
	const loginUser = async (loginData) => {

		const config = {
			header: {
				'Content-Type':'application/json'
			}
		}
		try {
			const res = await axios.post('/api/auth', loginData, config);
			// console.log(res);

			dispatch({
				type: LOGIN_SUCCESS,
				payload:res.data,
		
			});

			loadUsers();
		} catch (error) {
			console.log(error.response.data.msg);
			dispatch({
				type: LOGIN_FAIL,
				payload:error.response.data.msg,
		
			});
		}
	
	
	
	};
	// Log out:destroy the token
	const logout = () => {
		dispatch({
		    type: LOGOUT,

		});
	
	};
	// Clear Errors
	const clearErrors = () => {
		dispatch({
			type: CLEAR_ERRORS,
		});
		// console.log('clear error users');
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				token: state.token,
				user: state.user,
				registerUser,
				loadUsers,
				loginUser,
				logout,
				clearErrors,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
