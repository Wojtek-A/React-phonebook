import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsAction } from '../../redux/Contacts/contactsOperations';
import {
  selectError,
  selectIsLoading,
} from '../../redux/Contacts/contactsSelectors';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactList } from '../../components/ContactsList/ContactsList';
import { UserMenu } from '../../components/UserMenu/UserMenu';
import { LoaderSpinner } from '../../components/Loader/Loader';

export const PhonebookPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContactsAction());
  }, [dispatch]);

  return (
    <div>
      <UserMenu />
      <ContactForm />
      {isLoading && !error && <LoaderSpinner />}
      <ContactList />
    </div>
  );
};
