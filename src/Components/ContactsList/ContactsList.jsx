import React from 'react';
import css from './ContactsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactAction } from 'redux/Contacts/cont.operations';
import { selectContacts, selectFilter } from 'redux/Contacts/cont.selectors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const contactsList = contacts.filter(contact =>
    contact.name.toUpperCase().includes(filter.toUpperCase())
  );

  const handleDelete = id => {
    dispatch(deleteContactAction(id));
  };

  const number = event => {
    const nr = event.slice(0, 16);
    return nr;
  };

  const image = event => {
    const img = event.slice(17);
    return img;
  };

  return (
    <div className={css.contactsList}>
      <h2>CONTACTS:</h2>
      <ul>
        {contactsList.map(contact => {
          return (
            <li key={contact.id} className={css.contact}>
              <img src={image(contact.number)} alt="contact face" height={60} />
              <p>Name: {contact.name}</p>
              <p>Number:{number(contact.number)}</p>
              <IconButton aria-label="delete" className={css.button}>
                <DeleteIcon
                  onClick={() => {
                    handleDelete(contact.id);
                  }}
                />
              </IconButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
