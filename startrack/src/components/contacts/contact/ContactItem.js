import React, { useContext } from 'react';
import ContactContext from '../../../context/contact/contactContext';


	const ContactItem = ({contact}) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact,currentContact,clearCurrent } = contactContext;
		const { name, phone, email, type, _id } = contact;
		
		

	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
		};
		


	const setCurrent = () => {
		currentContact(contact);
		};
		

	return (
		<div className="my-2 contact-item-box">
			<h1>{name.slice(0,1).toUpperCase()+name.slice(1)}</h1>

			{email &&
			(<div className="sm">
			<i className="fas fa-envelope"></i> {email}
		</div>)}
			
			{phone &&
			<div className="sm">
			<i className="fas fa-mobile"></i> {phone}
		</div>}
			
			<div className="special-1">
				<span className={type === 'personal' ? 'badge-blue' : 'badge-green'}>{type} </span>
			</div>
			<div className="btns">
				<button className="btn-danger" onClick={onDelete}>
					Delete
				</button>
				<button className="btn-normal" onClick={setCurrent}>
					Edit
				</button>
			</div>
		</div>
	);
};

export default ContactItem;
