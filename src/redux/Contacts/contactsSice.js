import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContactsAction,
  addContactAction,
  deleteContactAction,
} from './contactsOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContactsAction.pending]: handlePending,
    [fetchContactsAction.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContactsAction.rejected]: handleRejected,

    [addContactAction.pending]: handlePending,
    [addContactAction.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContactAction.rejected]: handleRejected,

    [deleteContactAction.pending]: handlePending,
    [deleteContactAction.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContactAction.rejected]: handleRejected,
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    findContactAction(state, action) {
      return action.payload;
    },
  },
});

export const { findContactAction } = filterSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const filterReducer = filterSlice.reducer;
