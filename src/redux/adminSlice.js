import{createSlice}from"@reduxjs/toolkit"
const adminSlice=createSlice({
    name:'admin',
    initialState:{
        adminData:{
        token:null,
      
    },
},
reducers:{
    addUser: (state, action) => {
        state.adminData.token = action.payload.token;
       
      },
      removeadmin: (state) => {
        state.adminData.token = null;
        state.adminData.username = null;
        state.adminData.id = null;
      },
}

})
export const{addUser,removeadmin}=adminSlice.actions
export default adminSlice.reducer
