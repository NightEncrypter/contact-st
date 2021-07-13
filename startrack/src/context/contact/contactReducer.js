/* eslint-disable import/no-anonymous-default-export */
import { ADD_CONTACT, DELETE_CONTACT, CLEAR_FILTER, CLEAR_CURRENT,SEARCH_CONTACTS, CURRENT_CONTACT,CONTACT_ERROR ,CLEAR_ERROR_CONTACTS,GET_CONTACT,CLEAR_CONTACTS,GET_ERROR,UPDATE_ERROR,UPDATE_CONTACT,DELETE_ERROR} from '../types';

export default (state, action) => {
	switch (action.type) {


		// MAIN ACTIONS
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload],
				loading:false,
			};
		case GET_CONTACT:
			return {
				...state,
				contacts: action.payload,
				loading:false,
			};
		
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
				current:null,
				
			}
		
			case DELETE_CONTACT:
				return {
					...state,
					contacts: state.contacts.filter((contact) => contact._id !== action.payload),
					loading:false,
	
				};
			case UPDATE_CONTACT:
				return {
					...state,
					contacts: state.contacts.map((contact) => contact._id === action.payload._id?action.payload:contact),
					loading:false,
	
				};
			case UPDATE_ERROR:
			case DELETE_ERROR:
				return {
					...state,
			
				error:action.payload
	
				};
		case GET_ERROR:

			return {
				...state,
				error: action.payload,
			};

// FILTER
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};
		case SEARCH_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');

					// find[Symbol.match](txt) RETURN NULL OR ARRAY
					// find.test(text); RETURN BOOLEAN
					// text.match(find); RETURN ARRAY OR NULL
					return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex);
				}),
			};
		
		// CURRENT
		case CURRENT_CONTACT:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current:null
			};
		// ERROR
			case CONTACT_ERROR:
				return {
					...state,
					error:action.payload
				}
			case CLEAR_ERROR_CONTACTS:
				return {
					...state,
					error: null,
				}
		default:
			return state;
	}
};
