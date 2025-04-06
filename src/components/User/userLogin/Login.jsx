import { useState } from 'react';
import { UserLogin, googleLogin } from '../../../configure/user';
import '../style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/userSlice';
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loginValues = { username: "", password: "" };
  const [datas, setDatas] = useState(loginValues);
  const [Block, setBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Google Login Implementation
  const googleSignIn = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || "172635673249-28l59cndnruhbkchsultcj9ci86hftn8.apps.googleusercontent.com",
    onSuccess: async (response) => {
      try {
        setGoogleLoading(true);
        
        // Get user info from Google
        const googleResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v1/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
              Accept: 'application/json'
            },
            timeout: 5000
          }
        );

        // Verify we got valid user data
        if (!googleResponse.data?.email) {
          throw new Error('Failed to get user info from Google');
        }

        // Send to your backend
        const backendResponse = await googleLogin({
          email: googleResponse.data.email,
          name: googleResponse.data.name || googleResponse.data.email.split('@')[0],
          googleId: googleResponse.data.id,
          profilePic: googleResponse.data.picture
        });

        // Handle backend response
        if (backendResponse.data?.success) {
          const userData = backendResponse.data.userDatas || backendResponse.data.userData;
          if (userData?.token) {
            localStorage.setItem('usertoken', JSON.stringify(userData.token));
            dispatch(addUser({
              id: userData.id,
              username: userData.username,
              token: userData.token,
              profilePic: userData.profilePic
            }));
            toast.success("Login successful");
            navigate('/');
          }
        } else {
          throw new Error(backendResponse.data?.message || 'Authentication failed');
        }
      } catch (error) {
        console.error('Google login error:', error);
        toast.error(error.message || "Google login failed");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google OAuth error:', error);
      toast.error("Failed to connect to Google. Please try again.");
      setGoogleLoading(false);
    },
    scope: 'profile email',
    ux_mode: 'popup',
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setDatas({...datas, [name]: value.trim()});
  };

  const handleSubmitForm = async (formData) => {
    try {
      setIsLoading(true);
      const response = await UserLogin({
        username: formData.username,
        password: formData.password
      });
      
      if (response.data.success) {
        localStorage.setItem('usertoken', JSON.stringify(response.data.userDatas.token));
        dispatch(addUser({
          id: response.data.userDatas.id,
          username: response.data.userDatas.username,
          token: response.data.userDatas.token,
        }));
        toast.success("Login successful");
        navigate('/');
      } else if (response.data.notfound) {
        setBlock('User Not found');
      } else if (response.data.Block) {
        setBlock('Your Account Is Blocked');
      } else if (response.data.incorrectdatas) {
        setBlock('Password Incorrect');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
    } finally {
      setTimeout(() => setBlock(null), 5000);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center lg:items-center">
      <div className="lg:w-[29%] sm:mt-12 bg-white w-[88%] mt-12 md:mb-12 custom-shadow">
        <div className="sm:ml-2">
          <p className="text-black font-semibold mt-5 ml-4 text-2xl">LOGIN</p>
          
          {/* Email Input */}
          <div className="ml-5 sm:ml-6 lg:ml-7 mt-6">
            <p className="w-full text-black text-lg">Email</p>
            <input
              {...register("username", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type="email"
              name="username"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-[92%] sm:w-[90%] h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username.message}</span>
            )}
          </div>
          
          {/* Password Input */}
          <div className="ml-5 sm:ml-6 lg:ml-7 mt-5">
            <p className="w-full text-black text-lg">Password</p>
            <input
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="••••••••"
              className="w-[92%] sm:w-[90%] h-10 border border-gray-300 rounded-sm bg-gray-50 pl-2"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>
          
          {/* Remember Me */}
          <div className="ml-5 sm:ml-6 lg:ml-7 mt-5 flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 accent-black" 
              {...register("remember")}
            />
            <label htmlFor="remember" className="ml-2 text-black text-sm">
              Remember Me
            </label>
          </div>
          
          {/* Error Message */}
          {Block && (
            <p className="text-center text-red-600 mt-2 text-sm">
              {Block}
            </p>
          )}
          
          {/* Login Button */}
          <div className="flex justify-center items-center mt-5 flex-col">
            <button 
              className={`w-[80%] h-10 rounded-lg text-white border-2 border-black font-bold bg-black hover:bg-gray-800 transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              onClick={handleSubmit(handleSubmitForm)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  PROCESSING...
                </span>
              ) : (
                'LOGIN'
              )}
            </button>
            
            <button
              className="text-[#4e42d0] text-sm mt-3 hover:underline focus:outline-none"
              onClick={() => navigate("/forgetpassword")}
              type="button"
            >
              Forgot Password?
            </button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center justify-center mt-6">
            <hr className="w-full border-t border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <hr className="w-full border-t border-gray-300" />
          </div>
          
          {/* Google Login Button */}
          <div className="mt-6 flex flex-col items-center justify-center">
            <button 
              className={`w-[80%] h-11 rounded-lg border-2 border-gray-300 flex justify-center items-center hover:bg-gray-50 transition-colors ${
                googleLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              onClick={() => !googleLoading && googleSignIn()}
              disabled={googleLoading}
              type="button"
            >
              {googleLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></span>
                  SIGNING IN...
                </span>
              ) : (
                <>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                    className="w-5 h-5 mr-2"
                    alt="Google logo"
                  />
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>
          
          {/* Sign Up Link */}
          <div className="text-center mt-6 mb-8">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              className="text-blue-600 font-medium hover:underline focus:outline-none"
              onClick={() => navigate("/register")}
              type="button"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}