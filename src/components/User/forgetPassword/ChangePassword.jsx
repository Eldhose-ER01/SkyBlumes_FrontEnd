import { useState } from "react";
import { changepassword } from "../../../configure/user";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
export default function ChangePassword() {
  const location = useLocation();
  const email = location.state;
  const [password, setPassword] = useState(" ");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const valuesSubmits = async () => {
    try {
      if (password === " ") {
        setError("Please fill email");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
      const datas = { email: email, password: password };
      const response = await changepassword(datas);
      if (response.data.success) {
        toast.success("Your Password Changed");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center lg:items-center">
        <div className="w-[90%] h-48 mt-[30%] sm:mt-[20%] lg:mt-0 sm:w-[50%] md:w-[30%] md:h-60 bg-white flex justify-center items-center flex-col rounded-md custom-shadow border border-green-300">
          <h1 className="font-extrabold mb-1 ">
            Please Enter Your New Password
          </h1>
          <input
            type="text"
            placeholder="Enter your Email"
            name="password"
            value={password}
            onChange={handleChange}
            className="w-[80%] h-12 pl-2 rounded-sm bg-gray-200 "
          />
          <p className="justify-center text-red-600">{error}</p>
          <button
            className="w-48 h-12 bg-black mt-5 text-white font-bold rounded-md hover:bg-green-400 hover:text-black"
            onClick={valuesSubmits}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
