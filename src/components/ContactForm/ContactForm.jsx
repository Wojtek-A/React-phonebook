import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction } from 'redux/Contacts/cont.operations';
import { selectContacts } from 'redux/Contacts/cont.selectors';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import css from './ContactForm.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [image, setImage] = useState('');
  const selectOptions = [
    { value: 'woman_face', label: 'Female' },
    { value: 'man_portrait', label: 'Male' },
  ];
  const [selected, setSelected] = useState(null);

  function getPhoto(gender) {
    fetch(
      `https://pixabay.com/api/?key=31879858-48b8240230109758709fe8f87&q=${gender}&image_type=photo&orientation=horizontal&category=people&safesearch=true&per_page=40&page=2`
    )
      .then(res => res.json())
      .then(
        result => {
          const data = result.hits;
          setImage(data[Math.floor(Math.random() * data.length)]);
        },
        error => {
          console.log(error);
        }
      );
  }

  const handleChange = selectedOption => {
    setSelected(selectedOption);
    getPhoto(selectedOption.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    if (
      contacts.find(
        contact => contact.name.toUpperCase() === form.name.value.toUpperCase()
      )
    ) {
      Notify.failure(`${form.name.value} is already in contacts.`);
      return true;
    }
    if (selected === null) {
      Notify.failure(`Please select contact gender`);
      return true;
    }

    const numberValue = [`${form.number.value}`, `${image.webformatURL}`];
    const inputValue = {
      name: form.name.value,
      number: numberValue.toString(),
    };

    dispatch(addContactAction(inputValue));
    Notify.success(`${inputValue.name} has been added to your phonebook`);
    form.reset();
    setSelected(null);
  };

  return (
    <div>
      <form className={css.contactsForm} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          className={css.input}
          type="text"
          name="name"
          value={contacts.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Jan Kowalski"
        />
        <label htmlFor="name">Landline number:</label>
        <InputMask
          className={css.input}
          type="tel"
          name="number"
          value={contacts.phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          mask="+48(99)999-99-99"
          placeholder="+48 (99) 999-99-99"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <label htmlFor="gender">Gender:</label>
        <Select
          className={css.select}
          name="gender"
          value={selected}
          options={selectOptions}
          onChange={handleChange}
          placeholder="Select"
        />
        <button className={css.contactsbutton} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};
