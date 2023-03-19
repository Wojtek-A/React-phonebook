import { useDispatch } from 'react-redux';
import css from './Filter.module.css';
import { findContactAction } from '../../redux/Contacts/cont.slice';

export const Filter = () => {
  const dispatch = useDispatch();

  const onChange = event => {
    const value = event.target.value;
    dispatch(findContactAction(value));
  };

  return (
    <>
      <input
        className={css.input}
        type="tex"
        name="filter"
        onChange={onChange}
        placeholder="Find contacts by name"
      />
    </>
  );
};
