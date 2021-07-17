import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import { useSpring, animated } from "react-spring";

// import { CLEAR_ERRORS } from '../../../context/types';

const Login = (props) => {
  // const [flip, set] = useState(false)
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { loginUser, isAuthenticated, error, clearErrors } = authContext;
  const { setAlert } = alertContext;
  const springProps = useSpring({
    to: { opacity: 1, translateX: "0" },
    from: { opacity: 0, translateX: "-30rem" },
    delay: 200,
  });

  const [icon, setIcon] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      setAlert("Login success", "success");
      props.history.push("/");
    }

    if (error === "user not found") {
      setAlert(error, "not-found");
      clearErrors();
    }

    //eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = login;

  const onChange = (e) => {
    setLogin({
        ...login,
      [e.target.name]: e.target.value,
    });
  };

  const userSubmit = (e) => {
    if (email === "" || password === "") {
      setAlert("Please fill all input fields", "input-fields-empty");
    }
    loginUser({ email, password });
    //   setAlert('Login success', 'success');

    e.preventDefault();
  };
  return (
    <animated.div style={springProps}>
      <div className="inner-container">
        <form className="login-form" onSubmit={userSubmit}>
          <h2>Sign In</h2>

          <div className="reg-group">
            <input
              type="text"
              name="email"
              className="reg-input"
              value={email}
              onChange={onChange}
              autoComplete="on"
              required
            />
            <label htmlFor="email">Email</label>
            <span>
              <i className="fas fa-user"></i>
            </span>
            <div className="bb-line"></div>
          </div>
          <div className="reg-group">
            <input
              type={icon ? "text" : "password"}
              name="password"
              value={password}
              onChange={onChange}
              className="reg-input"
              autoComplete="off"
              required
            />
            <label htmlFor="password">Password</label>
            <span>
              <i
                onClick={() => setIcon(!icon)}
                className={icon ? "fas fa-unlock" : "fas fa-lock"}
                style={iconStyle}
              ></i>
            </span>
            <div className="bb-line"></div>
          </div>
          <input type="submit" value="Submit" className="login-btn" />
        </form>
      </div>
    </animated.div>
  );
};

const iconStyle = {
  cursor: "pointer",
};

export default Login;
