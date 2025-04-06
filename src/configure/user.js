import { userAxiosInstance } from "./interceptor";

/*----------------------------user signup page------------------*/
const userSignup=async(data)=>{
    try {
        const response=await userAxiosInstance.post(`/signup`,{data})
        return response
    } catch (error) {
        console.log(error,"Api error");
    }
}
/*----------------------------Otp------------------*/
const Otpform=async(data)=>{
    try {
const response=await userAxiosInstance.post('/otpsubmit',{data})
return response
    } catch (error) {
        console.log(error,"Api");
    }
}
/*--------------------ResendOTP--------------------------*/
const ResendOTP = async (data) => {
    try {
      const response = await userAxiosInstance.post("/resendotp", { data });
      return response;
    } catch (error) {
      console.log(error.message, "error form front");
    }
  };

 /*--------------------Login--------------------------*/ 
 const UserLogin=async(data)=>{
  try {
    const response=await userAxiosInstance.post("/login",{data})
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
 }
/*--------------------forgetpassword--------------------------*/ 
const ForgetPass=async(data)=>{
  try {
    const response=await userAxiosInstance.post('/forgetotp',{data})
    return response
  } catch (error) {
    console.log(error.message, "error form frontend");

  }
}
const ForgetOtpsubmit=async(data)=>{
  try {
    const response=await userAxiosInstance.post('/forgetotpsubmit',{data})
    return response
  } catch (error) {
    console.log(error.message, "error form frontend");

  }
}
const changepassword=async(data)=>{
  try {
    const response=await userAxiosInstance.post('/passwordcahnge',{data})
    return response
  } catch (error) {
    console.log(error.message, "error form frontend");

  }
}

const googleLogin=async(data)=>{
  try {
    const response=await userAxiosInstance.post('/googlelog',{data})
    return response
  } catch (error) {
    console.log(error.message, "error form frontend");

  }
}

const destinationpoint=async(distictname)=>{
  try {
    const response=await userAxiosInstance.get(`/destinationpoint?districtname=${distictname}`)
    return response
  } catch (error) {
    console.log(error.message, "error form frontend");

  }
}
const userProfile=async()=>{
  try {
    const response=await userAxiosInstance.get('/userprofile')
    return response
  } catch (error) {
    console.log(error.message, "error form frontend");

  }
}
const Editprofile=async(data)=>{
  try {
    const response=await userAxiosInstance.post('/editprofile',data)
    return response
  } catch (error) {
    console.log(error.message, "error form frontend");

  }
}

/*-------------------------Bookingsdatas-------------------------*/
const Bookingsdatas = async (data) => {
  try {
    const response = await userAxiosInstance.post("/create-checkout-session", {
      data,
    });
    return response;
  } catch (error) {
    console.log(error.message, "error form front");
  }
};

const WalletAmounts=async()=>{
  try {
    const response=await userAxiosInstance.get("/walletamount")
  return response
  } catch (error) {
    console.log(error.message, "error form front");
  }
  
}

const FindBookings=async()=>{
  try {
    const response=await userAxiosInstance.get("/findbooking")
  return response
  } catch (error) {
    console.log(error.message, "error form front");
  }
  
}

const CanelBooking=async(id)=>{
try {
  const response=await userAxiosInstance.post(`/bookingcancel?id=${id}`)
  return response
} catch (error) {
  console.log(error);
  
}
}
  export{
    userSignup,
    Otpform,
    ResendOTP,
    UserLogin,
    ForgetPass,
    ForgetOtpsubmit,
    changepassword,
    googleLogin,
    destinationpoint,
    userProfile,
    Editprofile,
    Bookingsdatas,
    WalletAmounts,
    FindBookings,
    CanelBooking
  }