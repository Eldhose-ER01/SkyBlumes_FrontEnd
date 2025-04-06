import  { useState } from 'react';
import { useDispatch } from "react-redux";
import { removeUser } from '../../../redux/userSlice';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Updated import for v2
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()
  const dispatch = useDispatch();

  const tokens=localStorage.getItem("usertoken")
  const homelogout = () => {
    dispatch(removeUser());
    localStorage.clear();
    navigate("/login");
  };
  const logindata=()=>{
    navigate('/login')
  }
  return (
    <nav className="bg-white shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h:20 sm:h-24">
          {/* Left Side: Menu Icon (Mobile) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-800">
              <img className='w-20 sm:w-24' src="/static/Images/Screenshot 2025-03-20 161642-Photoroom.png" />
            </span>
          </div>

          {/* Right Side: Navigation Links (Desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-8 ">
            <Link to={"/"} className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-md font-bold">
              Home
            </Link>
            <Link to={"/selectstate"} className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-md font-bold">
              Places
            </Link>
            <Link to={"/userprofile"} className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-md font-bold">
              Profile
              </Link>
            {tokens == null ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"onClick={logindata}>
              Login
            </button>
             ) : (
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"onClick={homelogout}>
              Logout
            </button>
             )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
           <Link to={"/"} className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium">
           Home
           </Link>
             
           
             <Link to={"/selectstate"} className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium">
              Places
            </Link>
            <Link to={"/userprofile"} className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium">
              Profile
            </Link>
            {tokens == null ? (
              <div className="md:ml-8 text-xl semibold md:my-0 my-7">
                <Link to={"/login"} className="font-semibold">
                  Login
                </Link>
              </div>
            ) : (
              <div className="md:ml-8 text-xl semibold md:my-0 my-7">
                <Link
                  to={"/login"}
                  className="font-semibold"
                  onClick={homelogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNav;