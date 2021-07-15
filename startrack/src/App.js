import React, { Fragment } from 'react';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/pages/auth/Register';
import Login from './components/pages/auth/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Alerts from './components/navbar/Alerts';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './private route/PrivateRoute';

import './App.css';


if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<div>

			{/* <svg className="svg2" viewBox="0 0 1440 320"><path fill="#580472" fill-opacity="1" d="M0,32L48,58.7C96,85,192,139,288,160C384,181,480,171,576,149.3C672,128,768,96,864,112C960,128,1056,192,1152,192C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
			

			<svg className="svg-square7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#580472" fill-opacity="1" d="M0,288L0,192L1440,192L1440,0L0,0L0,0Z"></path></svg>
			<svg className="svg-square8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#580472" fill-opacity="1" d="M0,288L0,192L1440,192L1440,0L0,0L0,0Z"></path></svg>
			<svg className="svg-square1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#580472" fill-opacity="1" d="M0,288L0,192L1440,192L1440,0L0,0L0,0Z"></path></svg>
		 <svg className="svg-square4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#580472" fill-opacity="1" d="M0,288L0,192L1440,192L1440,0L0,0L0,0Z"></path></svg> 
			<svg className="svg-square5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#580472" fill-opacity="1" d="M0,288L0,192L1440,192L1440,0L0,0L0,0Z"></path></svg>
			<svg className="svg-square6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#580472" fill-opacity="1" d="M0,288L0,192L1440,192L1440,0L0,0L0,0Z"></path></svg>
			<svg className="svg-square2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#580400" fill-opacity="1" d="M0,288L0,192L1440,192L1440,0L0,0L0,0Z"></path></svg>
			<svg className="svg-square2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#580472" fill-opacity="1" d="M0,288L0,192L1440,192L1440,0L0,0L0,0Z"></path></svg>
			<svg className="svg-square3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#580472" fill-opacity="1" d="M0,288L0,192L1440,192L1440,0L0,0L0,0Z"></path></svg> 
			<svg className="svg3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#580472" fill-opacity="1" d="M0,256L48,261.3C96,267,192,277,288,240C384,203,480,117,576,117.3C672,117,768,203,864,202.7C960,203,1056,117,1152,117.3C1248,117,1344,203,1392,245.3L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg> */}
			
		
			
			
			<AuthState>
			<ContactState>
				<AlertState>
			<Router>
				<Fragment>
							<Navbar />
							<div className="container">
							
						
							<Alerts/>
					
					<Switch>
						<PrivateRoute exact path="/" component={Home} />
						<Route exact path="/about" component={About} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
					</Switch>
							</div>
						
			
				</Fragment>
					</Router>
					</AlertState>
		</ContactState>
		</AuthState>
		</div>
		
		
	);
};

export default App;
