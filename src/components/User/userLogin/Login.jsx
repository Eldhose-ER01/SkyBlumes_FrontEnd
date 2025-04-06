import { useState,useEffect } from 'react';
import { UserLogin,googleLogin } from '../../../configure/user';
import '../style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/userSlice';
import {useForm} from "react-hook-form"
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch=useDispatch()
  const loginValues={username:"",password:""}
  const[datas,setDatas]=useState(loginValues)
  const[Block,setBlock]=useState(null)
  const [user, setUser] = useState([])
  const Glogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});



useEffect(() => {
const googledata=async()=>{
  try {
    if (user) {
      console.log("hiii");
      
      const response=await axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
           
          const Gdetails=await googleLogin(response.data)
        
          
          if(Gdetails.data.success){
            if(Gdetails.data.userDatas){

           

           localStorage.setItem('usertoken', JSON.stringify(Gdetails.data.userDatas.token));
          dispatch(
            addUser({
              id: Gdetails.data.userDatas.id,
              username: Gdetails.data.userDatas.username,
              token: Gdetails.data.userDatas.token,
            })
          );
          toast.success("Login successfull")
          navigate('/');
        }else if (Gdetails.data.userData) {
          
          localStorage.setItem('usertoken', JSON.stringify(Gdetails.data.userData.token));
          dispatch(
            addUser({
              id: Gdetails.data.userData.id,
              username: Gdetails.data.userData.username,
              token: Gdetails.data.userData.token,
            })
          )
          toast.success("Login successfull")
          navigate('/');
          
        }
      }
  }
  } catch (error) {
    console.log(error);
  }
}
googledata()
}, [user])

  const handlechange=(e)=>{
    const {value,name}= e.target
    setDatas({...datas,[name]:value.trim()})
  }
  const navigate=useNavigate()
  const ValuesSubmit = async () => {
    try {
      const response = await UserLogin(datas);
      if (response.data.success) {
       
        localStorage.setItem('usertoken', JSON.stringify(response.data.userDatas.token));
        dispatch(
          addUser({
            id: response.data.userDatas.id,
            username: response.data.userDatas.username,
            token: response.data.userDatas.token,
          })
        );
        navigate('/');
      } else if (response.data.notfound) {
        setBlock('User Not found');
        setTimeout(() => {
          setBlock(null);
        }, 5000);
      } else if (response.data.Block) {
        setBlock('Your Account Is Blocked');
        setTimeout(() => {
          setBlock(null);
        }, 5000);
      } else if (response.data.incorrectdatas) {
        setBlock('Password Incorrect');
        setTimeout(() => {
          setBlock(null);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-screen w-full flex justify-center lg:items-center  ">
        <div className="lg:w-[29%] sm:mt-12 bg-white w-[88%] mt-12 md:mb-12 custom-shadow  ">
          <div className="sm:ml-2">
            <p className="text-black font-semibold mt-5 ml-4 text-2xl">LOGIN</p>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-6">
              <p className="w-full text-black text-lg">Email</p>
              <input
               {...register("username", { required: true })}
                type="email"
                name="username"
                onChange={handlechange}
                placeholder="Enter your email"
                className="w-[92%] sm:w-[90%]  h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
                
              />
              {errors.username && (
                  <span style={{ color: "red" }}>Please fill email</span>
                )}
            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-5 ">
              <p className="w-full text-black text-lg">Password</p>
              <input
               {...register("password", { required: true })}
                type="password"
                name="password"
                onChange={handlechange}
                placeholder="••••••••"
                className="w-[92%] sm:w-[90%]   h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
              {errors.password && (
                  <span style={{ color: "red" }}>Please fill password</span>
                )}
            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-5 ">
              <input type="checkbox" name="" id="" className="w-4 h-4" />
              <span className="ml-1 text-black"> Remember Me?</span>
            </div>
            
            <div className=" flex justify-center items-center mt-5 flex-col">
            <p className='justify-center text-red-600'>{Block}</p>
           
              <button className="w-[80%] h-10 rounded-lg text-white border-2 border-black hover:text-black font-bold bg-black hover:bg-[#60cd6d]" onClick={handleSubmit(ValuesSubmit)}>
                LOGIN
              </button>
              <p className="text-[#4e42d0] w-full text-right mr-14 mt-2 cursor-pointer"onClick={()=>navigate("/forgetpassword")}>
                Forgot Password?
              </p>
            </div>
            <div className="flex items-center justify-center">
              <hr className="w-full border-t-2 border-gray-200 dark:border-gray-700" />
              <p className="mx-3 text-gray-400 font-bold uppercase">or</p>
              <hr className="w-full border-t-2 border-gray-200 mr-1 dark:border-gray-700" />
            </div>
            <div className="mt-5 flex flex-col items-center justify-center ">
              <button className="w-[80%] h-11 rounded-lg border-2 border-black  flex justify-center"onClick={()=>Glogin()}>
                <img
                  src="https://cdn-teams-slug.flaticon.com/google.jpg"
                  className="w-10 h-10 rounded-xl  "
                />
              </button>
            </div>
            <p className="text-blue-700 mt-4 ml-12 text-left mb-10 cursor-pointer">
              Need an account?<span onClick={() => navigate("/register")}>SIGN UP</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
