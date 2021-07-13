import React, { useReducer } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import { ADD_CONTACT, CLEAR_FILTER,GET_CONTACT,UPDATE_ERROR,UPDATE_CONTACT, DELETE_CONTACT,CLEAR_CURRENT,CLEAR_CONTACTS, CONTACT_ERROR,SEARCH_CONTACTS, CURRENT_CONTACT,DELETE_ERROR,CLEAR_ERROR_CONTACTS ,GET_ERROR} from '../types';

const ContactState = (props) => {
	const initialState = {
		filtered: null,
		current: null,
		contacts:null,
		error: null
	}



	const [state, dispatch] = useReducer(ContactReducer, initialState);


	// GET CONTACTS
	const getContacts = async() => {
		
		try {
			const res = await axios.get('/api/contacts');

			// console.log(res.data);

			dispatch({
				type: GET_CONTACT,
				payload: res.data,
			})
		} catch (err) {
			// console.log(err.response.data.msg);

			dispatch({
				type: GET_ERROR,
				payload:err.response.data.msg
			})
		}
	}


	// Add contact
	const addContact =async (contact) => {
		// generate random id
		const config = {
		  header: {
		 'Content-Type':'application/json'
	      }
        }
		try {
			const res = await axios.post('/api/contacts', contact, config);

			console.log(res.data);
			dispatch({
				type: ADD_CONTACT,
				payload: res.data,
			})
		} catch (error) {
			// console.log(error.response.data.msg);

			dispatch({

				type: CONTACT_ERROR,
				payload: error.response.data.msg,
			})
		}
		// contact.id = uuidv4();
	
	};



	// //Delete contact
	const deleteContact = async(id) => {


		try {
			await axios.delete(`/api/contacts/${id}`)
			dispatch({
				type: DELETE_CONTACT,
				payload: id,
			});
		} catch (error) {
			dispatch({
				type: DELETE_ERROR,
				payload:error.response.data.msg,
			});
		}
		
		dispatch({
			type: DELETE_CONTACT,
			payload: id,
		});
	};

	// Current Contact
	const currentContact = (data) => {
		dispatch({
			type: CURRENT_CONTACT,
			payload: data,
		});
	};
	// Update Contact 
	const updateContact = async (data) => {
		
		const config = {
			header: {
		   'Content-Type':'application/json'
			}
		  }

		try {
			const res = await axios.put(`/api/contacts/${data._id}`,data,config)
			dispatch({
				type: UPDATE_CONTACT,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: UPDATE_ERROR,
				payload:error.response.msg,
			});
		}
	
	};

	// CLEAR CONTACTS/
	const clearContacts=() => {
		dispatch({
			type: CLEAR_CONTACTS,
			
		})
	}
	// Search contact
	const searchContacts = (text) => {
		dispatch({
			type: SEARCH_CONTACTS,
			payload: text,
		});
	};

	const clearFilter = () => {
		dispatch({
			type: CLEAR_FILTER,
		});
	};
	// State: state allows us to access anything in our state and dipatch allows us to dispatch objextst to the reducer
	// eslint-disable-next-line

	const clearCurrent = () => {
		dispatch({
			type: CLEAR_CURRENT
			
		})
	}
	const clearErrorContacts = () => {
		dispatch({
			type: CLEAR_ERROR_CONTACTS
			
		})
	}
	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				getContacts,
				addContact,
				deleteContact,
				currentContact,
				searchContacts,
				clearFilter,
				clearCurrent,
				clearErrorContacts,
				updateContact,
				clearContacts,

			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
