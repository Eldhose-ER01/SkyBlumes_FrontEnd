import{createSlice}from"@reduxjs/toolkit"
const userSlice = createSlice({
    name: 'user',
    initialState: {
      userData: {
        token: null,
        username: null,
        id: null,
      },
    },
    reducers: {
      addUser: (state, action) => {
        state.userData.token = action.payload.token;
        state.userData.username = action.payload.username;
        state.userData.id = action.payload.id;
      },
      removeUser: (state) => {
        state.userData.token = null;
        state.userData.username = null;
        state.userData.id = null;
      },
    },
  });
export const{addUser,removeUser}=userSlice.actions
export default userSlice.reducer