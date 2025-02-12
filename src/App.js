import React, { useState,Fragment } from "react";
import { nanoid } from 'nanoid';
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from './components/EditableRow';

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    nameId: "",
    title: "",
    isbn:"",
    author:""
  });

  const [editFormData, setEditFormData] = useState({
    nameId: "",
    title: "",
    isbn: "",
    author: "",
  })

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue =  event.target.value;

    const newFormData = {...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] =  fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      nameId: addFormData.nameId,
      title: addFormData.title,
      isbn: addFormData.isbn,
      author: addFormData.author,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact  = {
      id:editContactId,
      nameId: editFormData.nameId,
      title: editFormData.title,
      isbn: editFormData.isbn,
      author: editFormData.author
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact)=> {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      nameId: contact.nameId,
      title: contact.title,
      isbn: contact.isbn,
      author: contact.author,
    }

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact)=> contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  }

  return <div className="app-container">
    <form onSubmit={handleEditFormSubmit}>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>TITLE</th>
          <th>ISBN</th>
          <th>AUTHOR</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <Fragment>
            { editContactId === contact.id ? (
              <EditableRow editFormData={editFormData} 
              handleEditFormChange={handleEditFormChange} 
              handleCancelClick={handleCancelClick}
              />
              ) : (
            <ReadOnlyRow 
            contact={contact} 
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}/>
            )}
          </Fragment>
  
        ))}
      </tbody>
    </table>
    </form>
    <h2>Add a Contact</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input
      type="text"
      name="nameId"
      required="required"
      placeholder="Enter an ID..."
      onChange={handleAddFormChange}
      />
      <input
      type="text"
      name="title"
      required="required"
      placeholder="Enter a TITLE..."
      onChange={handleAddFormChange}
      />
      <input
      type="text"
      name="isbn"
      required="required"
      placeholder="Enter an ISBN..."
      onChange={handleAddFormChange}
      />
      <input
      type="text"
      name="author"
      required="required"
      placeholder="Enter an AUTHOR..."
      onChange={handleAddFormChange}
      />
      <button type="submit">Add</button>
    </form>
  </div>;
}

export default App;