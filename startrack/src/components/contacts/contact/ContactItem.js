import React, { useContext, useState } from "react";
import ContactContext from "../../../context/contact/contactContext";

const ContactItem = ({ contact, popOpen }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, currentContact, clearCurrent } = contactContext;
  const { name, phone, email, type, _id } = contact;

  const { display, setDisplay } = useState(false);

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  const setCurrent = () => {
    currentContact(contact);
    popOpen();
  };

  const shContact = () => {
    setDisplay(!display);
  };
  const smallQuery = (
    <div className="btns-icons">
      <button className="btn-danger" onClick={onDelete}>
        <i class="fas fa-trash-alt"></i>
      </button>
      <button className="btn-normal" onClick={setCurrent}>
        <i class="fas fa-pen"></i>
      </button>
    </div>
  );

  const normalQuery = (
    <div className="btns">
      <button className="btn-danger" onClick={onDelete}>
        Delete
      </button>
      <button className="btn-normal" onClick={setCurrent}>
        Edit
      </button>
    </div>
  );

  const showct = (
    <div>
      {email && (
        <div className="sm">
          <i className="fas fa-envelope"></i> {email}
        </div>
      )}

      {phone && (
        <div className="sm">
          <i className="fas fa-mobile"></i> {phone}
        </div>
      )}

      <div className="special-1">
        <span className={type === "personal" ? "badge-blue" : "badge-green"}>
          {type}{" "}
        </span>
      </div>
      {normalQuery}
      {smallQuery}
    </div>
  );

  return (
    <div className="my-2 contact-item-box">
      <h1>{name.slice(0, 1).toUpperCase() + name.slice(1)}</h1>
      {/* <button onClick={shContact}>active</button> */}
      {showct}
    </div>
  );
};

export default ContactItem;
