import Contacts from "../contacts/contact/Contacts";
import ContactForm from "../contacts/contact/ContactForm";
import SearchBox from "../contacts/contact/SearchBox";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";
import { useSpring, animated } from "react-spring";

const Home = () => {
  const springProps1 = useSpring({
    to: { opacity: 1, translateX: "0" },
    from: { opacity: 0, translateX: "-30rem" },
    delay: 250,
  });
  const springProps2 = useSpring({
    to: { opacity: 1, translateX: "0" },
    from: { opacity: 0, translateX: "30rem" },
    delay: 250,
  });
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { loadUsers } = authContext;
  const { clearCurrent } = contactContext;

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, []);

  const [open, setOpen] = useState(false);

	const addContact = () => {
		clearCurrent();
    setOpen(true);
  };
  const popOpen = () => {
    setOpen(true);
  };
  const popClose = () => {
    setOpen(false);
  };

  return (
    <div className="grid-2">
      <animated.div style={springProps1}>
        <ContactForm open={open} popClose={popClose} />
      </animated.div>

      <animated.div style={springProps2}>
        <div className="main-lists">
          <SearchBox />
          <h1 className="contact-lists">Contact Lists</h1>
          <Contacts popOpen={popOpen} />
        </div>
      </animated.div>

      <button
        className={!open ? "addcontact-btn" : "addcontact-btnout"}
        onClick={addContact}
      >
        <i className={!open ? "fas fa-user-plus" : "fas fa-times"}></i>
      </button>
    </div>
  );
};

export default Home;
