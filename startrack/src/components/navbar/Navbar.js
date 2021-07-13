import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Fragment,useContext ,useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import { useSpring, animated } from 'react-spring';





const Navbar = ({ title, icon }) => {

	const [active, setActive] = useState(false);
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);
	const springProps = useSpring({ to: { opacity: 1,translateX:'0' },from: { opacity: 0 ,translateX:'30rem'}, delay:200,
})

	const { isAuthenticated,user,logout } = authContext;
	const { clearContacts } = contactContext;

	const hamClick = () => {
		setActive(!active);
	}
	const userOut = () => {
		logout();
		clearContacts();
	}

	const ham = {
		pointerEvent: "none",
		cursor:"pointer"
	}
	const auth=  (
			<Fragment>
			<li >
			<div className="mediaquery user" style={{color:"#007ACC"}}>
			<i className="fas fa-user-alt"></i>&nbsp;{user && user.name.slice(0,1).toUpperCase()+user.name.slice(1,6)}
				</div>
			</li>
			<li>
			<Link className="mediaquery logout-btn"  to="#" onClick={userOut}>
			Logout&nbsp;<i className="fas fa-sign-out-alt"></i>
			</Link>
			</li>
		
	
			</Fragment>)
	const guest = (
		
			<Fragment>
			
			
			<li>
			<Link className="mediaquery" to="/register">
			Register
			</Link>
			</li>
			<li  className="mediaquery">
					<Link to="/about">
						About
					</Link>
				</li >
				<li>
				<Link className="sign-in mediaquery" to="/login">
				Sign In
				</Link>
			</li>
			
		
		
		
			</Fragment>
	)

	return (
		<div className="navbar bg-primary">
		
			<h1>
		<i className={icon}></i> {title}
			</h1>
		
			<animated.div style={springProps}>
			<ul className={ active ?"nav-menu active":"nav-menu"}>
			{isAuthenticated?auth:guest}
			</ul>
			</animated.div>
		
			<div className={active?"active hamburger":"hamburger"} style={ham} onClick={hamClick} >
				<div></div>
				<div></div>
				<div></div>
			  </div>
		</div>
	);
};

// proptype checking
// Navbar.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	icon: PropTypes.string.isRequired,
// };
Navbar.defaultProps = {
	title: 'Contact Box',
	icon: 'fas fa-address-book',
};
export default Navbar;


