import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsAction } from '../redux/Contacts/cont.operations';
import { selectError, selectIsLoading } from '../redux/Contacts/cont.selectors';
import { ContactForm } from '../Components/ContactForm/ContactForm';
import { ContactList } from '../Components/ContactsList/ContactsList';
import { UserMenu } from '../Components/UserMenu/UserMenu';
import { LoaderSpinner } from '../Components/Loader/Loader';

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
