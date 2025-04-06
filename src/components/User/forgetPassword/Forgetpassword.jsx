import { useState } from "react"
import { ForgetPass } from "../../../configure/user"
import "../style.css"
import { useNavigate } from "react-router-dom"
export default function Forgetpassword() {
    const[email,setEmail]=useState()
    const[error,setError]=useState(null)
    const navigate=useNavigate()
    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value); 
    };

    const valuesSubmits=async()=>{
        try {
           if(email==null){
            setError("Please fill email")
            setTimeout(() => {
                setError(null)
            }, 3000);
           }
           if(email!=null){
            const response=await ForgetPass({email})
            if(response.data.success){
                navigate("/forgetotp",{state:email})
            }
           }
         
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <div className="w-full h-screen flex justify-center lg:items-center">
      <div className="w-[90%] h-48 mt-[30%] sm:mt-[20%] lg:mt-0 sm:w-[50%] md:w-[30%] md:h-60 bg-white flex justify-center items-center flex-col rounded-md custom-shadow border border-green-300">
       <input type="email" placeholder="Enter your Email"name="email"value={email} onChange={handleChange} className="w-[80%] h-12 pl-2 rounded-sm bg-gray-100 " />
       <p className="justify-center text-red-600">{error}</p>
       <button className="w-48 h-12 bg-black mt-5 text-white font-bold rounded-md hover:bg-green-400 hover:text-black"onClick={valuesSubmits}>Submit</button>
      </div>
    </div>
    </>
  )
}
