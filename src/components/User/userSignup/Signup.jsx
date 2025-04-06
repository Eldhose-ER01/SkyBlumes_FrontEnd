import { useState } from "react";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../../../configure/user";

export default function Signup() {
  const [err, setErr] = useState(null);
  const [passError, setPassError] = useState(null);
  const [feildErrors, setFeildErrors] = useState({
    fname: null,
    lname: null,
    mob: null,
    email: null,
    password: null,
    cpassword: null,
  });
  const navigate = useNavigate();
  const userData = {
    fname: "",
    lname: "",
    mob: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const [details, setDetails] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value.trim() });
  };

  const DetailsSubmitted = async () => {
    let errors = {};
    let hasError = false;

    // Check for empty fields
    Object.entries(details).forEach(([key, value]) => {
      if (!value) {
        errors[key] = `Please fill ${key}`;
        hasError = true;
      }
    });

    if (hasError) {
      setFeildErrors(errors);
      setTimeout(() => {
        setFeildErrors("")
      }, 2000);
      return;
    }

    // Check if password matches confirm password
    if (details.password !== details.cpassword) {
      setPassError("Passwords do not match");
      setTimeout(() => {
        setPassError(null)
      }, 5000);
      return;
    }

    try {
      const response = await userSignup(details);
      if (response.data.success) {
        navigate("/otp", { state: details });
      }
      if (response.data.message === "Email already exists") {
        setErr("Email already exists");
        setTimeout(() => {
          setErr(null)
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center lg:items-center">
        <div className="lg:w-[29%] sm:mt-2 bg-white w-[88%] mt-6 custom-shadow">
          <div className="sm:ml-2">
            <p className="text-black font-semibold mt-2 ml-4 text-2xl">
              Signup
            </p>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-3">
              <p className="w-full text-black text-lg">First Name</p>
              <input
                type="text"
                placeholder="Enter your first Name"
                name="fname"
                value={details.fname}
                onChange={handleChange}
                className="w-[92%] sm:w-[90%]  h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
              <span className="text-red-700 text-[15px] flex justify-center">
                {feildErrors.fname}
              </span>
            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-3">
              <p className="w-full text-black text-lg">Last Name</p>
              <input
                type="text"
                placeholder="Enter your Last Name"
                name="lname"
                value={details.lname}
                onChange={handleChange}
                className="w-[92%] sm:w-[90%]  h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
              <span className="text-red-700 text-[15px] flex justify-center">
                {feildErrors.lname}
              </span>
            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-3">
              <p className="w-full text-black text-lg">Mobile Number</p>
              <input
                type="text"
                placeholder="Enter your Mobile Number"
                name="mob"
                value={details.mob}
                onChange={handleChange}
                className="w-[92%] sm:w-[90%]  h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
              <span className="text-red-700 text-[15px] flex justify-center">
                {feildErrors.mob}
              </span>
            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-3 flex flex-col">
              <p className="w-full text-black text-lg">Email</p>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={details.email}
                onChange={handleChange}
                className="w-[92%] sm:w-[90%]  h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
              <span className="text-red-700 text-[15px] flex justify-center">
                {feildErrors.email}
              </span>
              <span className="text-red-700 text-[15px] flex justify-center">
                {err && err}
              </span>
            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-3 ">
              <p className="w-full text-black text-lg">Password</p>
              <input
                type="password"
                placeholder="••••••••"
                name="password"
                value={details.password}
                onChange={handleChange}
                className="w-[92%] sm:w-[90%]   h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
              <span className="text-red-700 text-[15px] flex justify-center">
                {feildErrors.password}
              </span>
            </div>
            <div className="ml-5 sm:ml-6 lg:ml-7 mt-3 ">
              <p className="w-full text-black text-lg">Confirm Password</p>
              <input
                type="password"
                placeholder="••••••••"
                name="cpassword"
                value={details.cpassword}
                onChange={handleChange}
                className="w-[92%] sm:w-[90%]   h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
              />
              <span className="text-red-700 text-[15px] flex justify-center">
                {feildErrors.cpassword}
              </span>
              <span className="text-red-700 text-[15px] flex justify-center">
                {passError && passError}
              </span>
            </div>

            <div className="flex justify-center items-center mt-3 flex-col mr-2">
              <button
                className="w-[85%] h-10 rounded-lg text-white hover:text-black font-bold bg-black hover:bg-[#60cd64]"
                onClick={DetailsSubmitted}
              >
                Sign up
              </button>
            </div>
            <p className="text-blue-700 mt-4 ml-12 text-left mb-10">
              Have an Account?
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer"
              >
                Login Here
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
