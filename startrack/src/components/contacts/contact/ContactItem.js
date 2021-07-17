import React, { useContext, useState } from "react";
import ContactContext from "../../../context/contact/contactContext";

const ContactItem = ({ contact, popOpen }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, currentContact, clearCurrent } = contactContext;
  const { name, phone, email, type, _id } = contact;



  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  const setCurrent = () => {
    currentContact(contact);
    popOpen();
  };




  const normalQuery = (
    <div className="btns">
        <i className="fas fa-user-cog"></i>
     
      <button className="btn-danger" onClick={onDelete}>
       <span>Delete</span><i className="fas fa-trash-alt"></i>
      </button>
      <button className="btn-normal" onClick={setCurrent}>
       <span>Edit</span><i className="fas fa-pen"></i>
       
      </button>
    </div>
  );

  const showct = (<div>
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
      
    </div>
  );

  return (
    <div className="my-2 contact-item-box"> 
      <h1>{name.slice(0, 1).toUpperCase() + name.slice(1)}</h1>
      {showct}
    </div>
  );
};

export default ContactItem;
