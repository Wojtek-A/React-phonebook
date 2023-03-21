import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const fetchContactsAction = createAsyncThunk(
  'contacts/fetchContactsAction',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      console.log(error);
      Notify.failure(
        'We have problem with downloading your contact list. Please login again'
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactAction = createAsyncThunk(
  'contacts/addContactAction',
  async (name, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', name);
      return response.data;
    } catch (error) {
      console.log(error);
      Notify.failure('Please try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactAction = createAsyncThunk(
  'contacts/deleteContactActions',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      Notify.failure('Please try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
