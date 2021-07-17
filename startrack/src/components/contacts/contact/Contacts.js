import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "./Spinner";
import ContactItem from "./ContactItem";
import ContactContext from "../../../context/contact/contactContext";
import AuthContext from "../../../context/auth/authContext";
const Contacts = ({popOpen}) => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);

  const { filtered, getContacts, contacts } = contactContext;
  const {  loading } = authContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return (
      <h4 className="list-alert">
        <i className="fas fa-user-plus"></i>&nbsp;&nbsp;Please add a contact
      </h4>
    );
  } else {
    return (
      <div className="lists">
        {contacts !== null && !loading ? (
          <TransitionGroup>
            {filtered !== null && !loading
              ? filtered.map((contact) => (
                  <CSSTransition
                    key={contact._id}
                    timeout={600}
                    classNames="item"
                  >
                    <ContactItem popOpen={popOpen} contact={contact} />
                  </CSSTransition>
                ))
              : contacts.map((contact) => (
                  <CSSTransition key={contact._id} timeout={500}>
                    <ContactItem contact={contact} popOpen={popOpen}  classNames="item" />
                  </CSSTransition>
                ))}
          </TransitionGroup>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
};

export default Contacts;
