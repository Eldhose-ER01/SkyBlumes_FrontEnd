import { adminAxiosInstance } from "./interceptor";

/******************adminLogin********/

 export const adminLogin=async(data)=>{
    try {
        const response=await adminAxiosInstance.post("/login",{data})
        return response
    } catch (error) {
        console.log(error);
    }
}
/******************users list********/

export const userList=async(page,searchdata)=>{
    try {
        const search = encodeURIComponent(searchdata); // Encode search term
        const response=await adminAxiosInstance.get(`/userlist?page=${page}&search=${search}`)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const StatusChange=async(id)=>{
    try {
        const response=await adminAxiosInstance.post(`/blockorunblock?id=${id}`)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const AddStateAndistrict = async (data) => {
    try {
      const response = await adminAxiosInstance.post('/addstate-district', data,{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    } catch (error) {
      console.log(error);
      
    }
  };
  export const findStateandDistrict=async(page,searchdata)=>{
    try {
        const search = encodeURIComponent(searchdata); // Encode search term
        const response=await adminAxiosInstance.get(`/findstate?page=${page}&search=${search}`)
        return response
    } catch (error) {
        console.log(error);
    }
}
export const StateBlockORUnblock=async(id)=>{
  try {
      const response=await adminAxiosInstance.post(`/blockorunblockstates?id=${id}`)
      return response
  } catch (error) {
      console.log(error);
  }
}
export const StateandDisrictDelete=async(id)=>{
  try {
      const response=await adminAxiosInstance.post(`/deletestates?id=${id}`)
      return response
  } catch (error) {
      console.log(error);
  }
}
export const editStateAndDistrict=async(data)=>{
    try {
        const response=await adminAxiosInstance.post('/editstates',data,{
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
        return response
    } catch (error) {
        console.log(error);

    }
}

export const Destinations=async(data)=>{
    try {
        const response=await adminAxiosInstance.post('/adddestinations',data,{
            headers: {
                "Content-Type": "multipart/form-data"
              }
        })
        return response
    } catch (error) {
        console.log(error);
        
    }
}
export const finddestinations=async(page,searchdata)=>{
    try {
        const search = encodeURIComponent(searchdata); // Encode search term

        const response=await adminAxiosInstance.get(`/dstination?page=${page}&search=${search}`)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const finddistrict=async()=>{
    try {
        

        const response=await adminAxiosInstance.get('/finddistrict')
        return response
    } catch (error) {
        console.log(error);
    }
}

export const editdestination=async(data)=>{
    try {
        const response=await adminAxiosInstance.post('/editdestination',data,{
            headers: {
                "Content-Type": "multipart/form-data"
              }
        })
        return response
    } catch (error) {
        console.log(error);
        
    }
}

export const Destinationdelete=async(id)=>{
    try {
        const response=await adminAxiosInstance.post(`/deletedestination?id=${id}`)
        return response
    } catch (error) {
        console.log(error);
    }
   
}

export const findbookingdata=async()=>{
    try {
      const response=await adminAxiosInstance.get(`/getbookingdatas`)
      return response
    } catch (error) {
      console.log(error);
      
    }
    }

export const CompleteBooking=async(id)=>{
try {
  const response=await adminAxiosInstance.post(`/bookingcomplete?id=${id}`)
  return response
} catch (error) {
  console.log(error);
  
}
}

