import React, { useState, useContext, useEffect } from 'react';

import ContactContext from '../../../context/contact/contactContext';
import AlertContext from '../../../context/alert/alertContext';


const ContactForm = ({open ,popClose}) => {
	const alertContext = useContext(AlertContext);
	const contactContext = useContext(ContactContext);
	const { addContact,updateContact,current ,clearCurrent,error,clearErrorContacts} = contactContext;

	const [alert1, setAlert1] = useState(false);
	// const [alert2, setAlert2] = useState(false);
	// const [alert3, setAlert3] = useState(false);

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	});

	// const style2 = {
	// 	background: alert2 === true ? '#A407D5' : '#580472',
	// 	transition: 'background 0.5s ease-in',
	// };
	// const style3 = {
	// 	color: alert3 === true ? '#A407D5' : '#580472',

	// };

	const style1 = {
		borderBottom: alert1 === true ? '1px red solid' : '1px solid #580472 ',
	};

	useEffect(() => {

// 		if (contactContext.error) {
// 		alertContext.setAlert(contactContext.error);
// 		// clearErrorContacts();
// }
		if (error) {
		alertContext.setAlert(error);
		clearErrorContacts();
}
		if (current !== null) {
			setContact(current);
			// setAlert2(true);
			// setAlert3(true);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			});
			// setAlert1(true);
			// setAlert2(false);
			// setAlert3(false);
		}
		//eslint-disable-next-line
	}, [current,contactContext,error]);

	const onChange = (e) => {
		setContact({
			...contact,
			[e.target.name]: e.target.value,
			// email:e.target.value,
			// phone:e.target.value,
			// name:e.target.value,
		});
	};
	const onSubmit = (e) => {
		e.preventDefault();

		

		if (current === null && name && email && phone !== '') {
			addContact(contact);
			popClose();
			alertContext.setAlert('Contact saved','success' );

			
		
		} else {
			updateContact(contact);
			clearCurrent();
			alertContext.setAlert('Update saved','success' );

		}

		if ((name && email && phone) === '') {
			alertContext.setAlert('Please fill all required input fields','input-fields-empty');
			setAlert1(true);
			setTimeout(() => setAlert1(false), 5000);

			
		}
		// console.log(contact);

		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal',
		});
	};

	const closeBox = () => {
		popClose();
	}
	const clearContact = () => {
		clearCurrent();
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal',
		})

	}
	

	// pulling out from  contact state
	const { name, email, phone, type } = contact;
	return (
		<div className={open?"active overlay":"overlay"}>
			<div className={open ? "active popup-box" : "popup-box"}>
			<button className="closebtn" onClick={closeBox}>&times; </button>
				<form action="#" className="contact-form" onSubmit={onSubmit}>
					
			<h2>{current !== null ? 'Update Contact' : 'Add Contact'}</h2>
			<div className="group">
			
				<input
					style={style1}
					type="text"
					name="name"
					value={name}
					onChange={onChange}
					className="input-style"
					autoComplete="off"
					required
				/>
				<span><i className="fas fa-user"></i></span>

					<label  htmlFor="name">
					Name
				</label>

			<div className="bb-line"></div>

			</div>
			<div className="group">
			
				<input
					style={style1}
					type="email"
					name="email"
					value={email}
					className="input-style"
					onChange={onChange}
					autoComplete="off"
				required
				/>
				<span><i className="fas fa-at"></i></span>
					<label htmlFor="email" >
					Email
				</label>
			<div className="bb-line"></div>

			</div>

			<div className="group">
				
				<input
					style={style1}
					type="number"
							name="phone"
							min="999999999"
					autoComplete="off"
					value={phone}
					className="input-style"
							onChange={onChange}
				required
				/>
				<span><i className="fas fa-mobile-alt"></i></span>

				<label htmlFor="phone" >
					Phone
				</label>
			<div className="bb-line"></div>
			</div>
			<div className="radio-btns">
				<div>
				<input
					type="radio"
					name="type"
					id="radio-1"
					onChange={onChange}
					value="personal"
					checked={type === 'personal'}
				/>
					{'  '}Personal
				</div>
			
			

				<div>
				<input
					type="radio"
					name="type"
					onChange={onChange}
					id="radio-2"
					value="professional"
					checked={type === 'professional'}
					/>{' '}Professional
				</div>
			
		
			</div>
			<div>
			<input
				type="submit"
				value={current !== null ? 'Update Contact' : 'Add Contact'}
				
				onSubmit={onSubmit}
			/>
				{current && <button className="btn-block" onClick={clearContact}>Clear Contact</button> }
			</div>
			

		</form>	
			</div>
			</div>
		// <form action="#" className="contact-form" onSubmit={onSubmit}>
		// 	<h2>{current !== null ? 'Update Contact' : 'Add Contact'}</h2>
		// 	<div className="group">
			
		// 		<input
		// 			style={style1}
		// 			type="text"
		// 			name="name"
		// 			value={name}
		// 			onChange={onChange}
		// 			className="input-style"
		// 			required
		// 		/>
		// 		<span><i className="fas fa-user"></i></span>

		// 			<label  htmlFor="name">
		// 			Name
		// 		</label>

		// 	<div className="bb-line"></div>

		// 	</div>
		// 	<div className="group">
			
		// 		<input
		// 			style={style1}
		// 			type="email"
		// 			name="email"
		// 			value={email}
		// 			className="input-style"
		// 			onChange={onChange}
		// 		required
		// 		/>
		// 		<span><i className="fas fa-at"></i></span>
		// 			<label htmlFor="email" >
		// 			Email
		// 		</label>
		// 	<div className="bb-line"></div>

		// 	</div>

		// 	<div className="group">
				
		// 		<input
		// 			style={style1}
		// 			type="number"
		// 			name="phone"
			
		// 			value={phone}
		// 			className="input-style"
		// 			onChange={onChange}
		// 		required
		// 		/>
		// 		<span><i className="fas fa-mobile-alt"></i></span>

		// 		<label htmlFor="phone" >
		// 			Phone
		// 		</label>
		// 	<div className="bb-line"></div>
		// 	</div>
		// 	<div className="radio-btns">
		// 		<div>
		// 		<input
		// 			type="radio"
		// 			name="type"
		// 			id="radio-1"
		// 			onChange={onChange}
		// 			value="personal"
		// 			checked={type === 'personal'}
		// 		/>
		// 			{'  '}Personal
		// 		</div>
			
			

		// 		<div>
		// 		<input
		// 			type="radio"
		// 			name="type"
		// 			onChange={onChange}
		// 			id="radio-2"
		// 			value="professional"
		// 			checked={type === 'professional'}
		// 			/>{' '}Professional
		// 		</div>
			
		
		// 	</div>
		// 	<div>
		// 	<input
		// 		type="submit"
		// 		value={current !== null ? 'Update Contact' : 'Add Contact'}
				
		// 		onSubmit={onSubmit}
		// 	/>
		// 		{current && <button className="btn-block" onClick={clearContact}>Clear Contact</button> }
		// 	</div>
			

		// </form>


		
	);
};

export default ContactForm;
