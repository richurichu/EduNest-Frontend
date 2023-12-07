import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRole: localStorage.getItem('temp_role') || 'USER', 
  mainRole: localStorage.getItem('main_role') || 'USER' 
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setCurrentRole: (state, action) => {
      state.currentRole = action.payload;
      localStorage.setItem('temp_role', action.payload); // also update localStorage
    },
    setMainRole: (state, action) => {
        state.mainRole = action.payload;
        localStorage.setItem('main_role', action.payload);
      }
  }
});

export const { setCurrentRole,setMainRole } = rolesSlice.actions;
export default rolesSlice.reducer;