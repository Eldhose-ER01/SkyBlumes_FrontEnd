import { useState } from "react";
import "../style.css";
import { adminLogin } from "../../../configure/admin";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const[datas,setDatas]=useState({email:"",password:""})
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[error,setError]=useState(null)
  const handlechange=(e)=>{
    const{value,name}=e.target
    const trimvalue=value.trim()
    setDatas({...datas,[name]:trimvalue})
  }

  const valueSubmit=async()=>{
  try {
   const response=await adminLogin({datas})
   if(response.data.success){
    console.log(response.data.admindetails);
    
    localStorage.setItem("admintoken",JSON.stringify(response.data.admindetails))
    dispatch(
      addUser({
        token:response.data.admindetails
      })
    )
navigate("/admin")
   }
   if(response.data.passwordnotmatch){
    setError("Email or Password Incorrect")
    setTimeout(() => {
      setError(null)
    }, 5000);
    return
   }
  } catch (error) {
    console.log(error);
  }
  }
  return (
    <>
      <div className=" lg:h-screen w-full flex justify-center lg:items-center  ">
        <div className="lg:w-[29%] sm:mt-12 bg-white w-[88%] mt-12 custom-shadow">
          <div className="sm:ml-2">
            <p className="text-green-400 font-semibold mt-5 ml-4 text-2xl">LOGIN</p>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-6">
              <p className="w-full text-black text-lg">Email</p>
              <input
               {...register("email", { required: true })}
                type="email"
                name="email"
                placeholder="Enter your email"
                value={datas.email}
                onChange={handlechange}
                className="w-[92%] sm:w-[90%]  h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
                
              />
               {errors.email && (
                  <span style={{ color: "red" }}>Please fill username</span>
                )}
            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-5 ">
              <p className="w-full text-black text-lg">Password</p>
              <input
              {...register("password", { required: true })}
                type="password"
                name="password"
                placeholder="••••••••"
                value={datas.password}
                onChange={handlechange}
                className="w-[92%] sm:w-[90%]   h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
               {errors.password && (
                  <span style={{ color: "red" }}>Please fill username</span>
                )}
            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-5 ">
              <input type="checkbox" name="" id="" className="w-4 h-4" />
              <span className="ml-1 text-black"> Remember Me?</span>
            </div>
            <p className="text-red-600 text-center">{error}</p>
            <div className=" flex justify-center items-center mt-5 flex-col mb-10">
              <button className="w-[80%] h-10 rounded-lg text-white hover:text-black font-bold bg-black hover:bg-[#80ef84]"onClick={handleSubmit(valueSubmit)}>
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
