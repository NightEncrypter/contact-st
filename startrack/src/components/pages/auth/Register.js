import React, { useState, useContext,useEffect } from 'react';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';
import { useSpring, animated } from 'react-spring';

const Register = (props) => {

	const springProps = useSpring({ to: { opacity: 1,translateX:'0' },from: { opacity: 0 ,translateX:'30rem'}, delay:200,
})
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { error,registerUser,clearErrors,isAuthenticated} = authContext;


	const [icon, setIcon] = useState(false);
useEffect(() => {

	if (isAuthenticated) {
		setAlert("Registered success", "success");
		props.history.push('/');

	}


	if (error === 'user already exist') {
		setAlert(error, 'user-exist');
		clearErrors();
	
	}
}, [isAuthenticated,error, props.history]);  // eslint-disable-line react-hooks/exhaustive-deps

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const { name, email, password, password2 } = user;

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
    };
    



	// console.log(e.target.value);

	const userSubmit = (e) => {
		if (name === '' || password === '' || email === '' || password2 === '') {
		setAlert('Please fill all input fields', 'input-fields');
		} else if (password !== password2) {
		setAlert('Password does not match', 'password not match');
		}
	
		registerUser({ name, email, password });
		e.preventDefault();
	};

	return (
		<animated.div style={springProps}>
				
			<form className="reg-container" id="form-reg" onSubmit={userSubmit}>
				<div className="mainform">
				<h2>Register User</h2>
				<div className="reg-group">
					<input
						type="text"
						name="name"
						className="reg-input"
						autoComplete="off"
						value={name}
						onChange={onChange} required
						/>
	<span><i className="fas fa-user"></i></span>

					<label htmlFor="name">Name</label>
						<div className="bb-line"></div>
				</div>
				<div className="reg-group">
					<input
						type="email"
						name="email"
						className="reg-input"
						value={email}
						autoComplete="off"
						onChange={onChange} required
						/>
	<span><i className="fas fa-at"></i></span>

					<label htmlFor="email">Email</label>
						<div className="bb-line"></div>
				</div>
				<div className="reg-group">
				
					<input
						type={icon?"text":"password"}
						name="password"
						className="reg-input"
						onChange={onChange}
							value={password}
							required
							autoComplete="off"
						/>
	<span>  <i onClick={() => setIcon(!icon)} className={icon ? "fas fa-unlock":"fas fa-lock"} style={iconStyle}></i></span>

							<label htmlFor="password">Password</label>
							<div className="bb-line"></div>
						
				</div>
				<div className="reg-group">
			
					<input
					type={icon?"text":"password"}
						onChange={onChange}
						name="password2"
						className="reg-input"
							value={password2}
							required
							autoComplete="off"
						/>

<span>  <i onClick={() => setIcon(!icon)} className={icon ? "fas fa-unlock":"fas fa-lock"} style={iconStyle}></i></span>

								<label htmlFor="password2">Confirm Password</label>
		<div className="bb-line"></div>
						
				</div>
				<input type="submit" value="Register" className="reg-btn" />
				</div>
				
			</form>
	
		</animated.div>

	);
};

export default Register;
const iconStyle = {
	cursor: "pointer"
}

// const obj1 = {
//     id: 1,
//     b: '123',
//     c:'333'
// }
// console.log(obj1)



// let a = [1,2,3,4,5,5,9,9,9,9,9,2,8,5,8];
// let b = [];
// let len = a.length;
// let temp;
// for (let i = 0; i < len; i++){


	
// 	if (a[i] !== temp) {
// 		b.push(a[i]);
// 		temp = a[i];
// console.log(a[i] !== temp);

// 	}
// }
// console.log(temp);
// console.log(b);




// let c=new Set(a)
// const array1 = [];
// for (let i = 0; i < a.length; i++){
// 	if (!array1.includes(a[i])) {

// 		array1.push(a[i]);
		
// 	}
// }

// console.log(array1);
// console.log(new Array(c));