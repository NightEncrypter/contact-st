/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactContext from '../../../context/contact/contactContext';

const SearchBox = () => {
	// Initialize
	const contactContext = useContext(ContactContext);

	// destructure
	const { filtered, clearFilter, searchContacts } = contactContext;

	// Using ref
	// Initialize
	const text = useRef('');

	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	},[filtered]);

	const onChange = (e) => {
		if (text.current.value !== '') {
		

			searchContacts(text.current.value);
		}
	};

	const clearData = (e) => {
	
		if (text.current.value !== '') {
			clearFilter();
		
		}
	};

	return (
		<div className="search-container">
			<input ref={text} type="text" onChange={onChange} id="search-box" placeholder="Search Contacts..." />
			<Link to="#" onClick={clearData}><i className=" ex fas fa-broom"></i></Link>
		</div>
	);
};

export default SearchBox;
