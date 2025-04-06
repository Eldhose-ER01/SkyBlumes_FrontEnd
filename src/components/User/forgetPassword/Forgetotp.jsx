import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {ResendOTP, ForgetOtpsubmit } from "../../../configure/user";
import toast from "react-hot-toast";

export default function Forgetotp() {
  const navigate = useNavigate();

  const location = useLocation();
  const value = location.state;
  const [wrongOTP, setWronotp] = useState("");
  const inputRef = useRef({});
  const [time, setTimer] = useState(20);
  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    digitFive: "",
    digitSix: "",
  });

  const renderInput = () => {
    return Object.keys(otp).map((keys, index) => (
      <input
        ref={(element) => (inputRef.current[index] = element)}
        type="text"
        name={keys}
        className="w-12 h-12 md:w-16 md:h-12 rounded-md mr-3 text-center text-xl bg-black-400 flex flex-wrap"
        onChange={(event) => handleChange(event, index)}
        value={otp[keys]}
        key={index}
        onKeyUp={(event) => handlebackspace(event, index)}
      />
    ));
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    if (/[a-z]/gi.test(value)) return;

    setOtp((prev) => ({
      ...prev,
      [name]: value.slice(-1),
    }));

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handlebackspace = (event, index) => {
    if (index > 0) {
      if (event.key === "Backspace") {
        inputRef.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    inputRef.current[0].focus();

    inputRef.current[0].addEventListener("paste", pasteText);

    // //   return () =>
    // //     inputRef.current[0].removeEventListener("paste", pasteText);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time > 0) {
        setTimer(time - 1);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  const pasteText = (event) => {
    const pastedText = event.clipboardData.getData("text");
    const feildvalues = {};
    Object.keys(otp).forEach((keys, index) => {
      feildvalues[keys] = pastedText[index];
    });
    setOtp(feildvalues);
    inputRef.current[5].focus();
  };


  

 
  const forgetOtpSubmit = async (e) => {
   
    try {
      e.preventDefault();

     

      const isOtpFilled = Object.values(otp).every(
        (value) => value.trim() !== ""
      );

      if (!isOtpFilled) {
        setWronotp("Please fill in all the fields");
        setTimeout(() => {
          setWronotp("");
        }, 3000);
        return; // Add early return here
      }

      // Forgetpassword otp submit
      const response = await ForgetOtpsubmit({otp});
      if (response.data.success) {
        navigate("/changepassword", { state:value});
      }
      if (response.data.wrongotp) {
        setWronotp(response.data.wrongotp);
        setTimeout(() => {
          setWronotp("");
        }, 3000);
        return; // Add early return here
      }
    } catch (error) {
      console.log(error);
   
  
}} 
 
  const resendotp = async () => {
    const datas = { userdetails: value };
    const response = await ResendOTP(datas);
    if (response.data.success) {
      toast.success("Success");
    } else {
      toast.error(`${(response.data.messsage, "error")}`);
    }
  };

  return (
    <div className="flex sm:items-center justify-center h-screen ">
      <form className="bg-sky-300 rounded-lg sm:p-8 shadow-md sm:w-full w-[23rem] max-w-lg text-center flex flex-col justify-center h-[300px] sm:mt-0 mt-[10rem]">
        <div className="w-full h-[28%] flex justify-center">
          <h3 className="text-3xl md:text-3xl text-red-800">
            Please Enter Your OTP
          </h3>
        </div>
        <div className="md:flex  flex justify-around ml-2 sm:ml-0 h-[28%]">
          {renderInput()}
        </div>
        <div>
          {time > 0 ? (
            <p>{time}</p>
          ) : (
            <p
              className="font-bold text-xl cursor-pointer"
              onClick={() => {
                setTimer(20);
                resendotp();
              }}
            >
              Resend
            </p>
          )}
         
            <button
              className="mt-4 w-48 sm:w-full md:w-32 bg-[#3b3b3b] rounded hover:bg-red-300 border-solid text-white py-2 mx-auto"
              onClick={forgetOtpSubmit}
            >
              Verify
            </button>
       
        </div>
        {/* {errors.otp && (
                 <span style={{ color: "red" }}>Plese Fill OTP feild</span>
        )} */}
        {wrongOTP && <span style={{ color: "red" }}>{wrongOTP}</span>}
      </form>
    </div>
  );
}
