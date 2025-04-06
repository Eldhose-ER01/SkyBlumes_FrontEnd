import UserNav from "../Usernav/UserNav";
import { userProfile } from "../../../configure/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function UserProfile() {
    const Navigate=useNavigate()
 const[userData,setUserdata]=useState([])
    const UserProfiledata=async()=>{
        try {
           
            
            const response=await userProfile()
            if(response.data.success){
                setUserdata(response.data.finddata)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    console.log(userData,"userData");
    
    useEffect(() => {
        UserProfiledata()
    }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <UserNav />
      
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">User Profile</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">
                      <p className="text-gray-900">{userData.fname}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">
                      <p className="text-gray-900">{userData.lname}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 p-2 bg-gray-100 rounded-md">
                    <p className="text-gray-900">{userData.email}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile</label>
                  <div className="mt-1 p-2 bg-gray-100 rounded-md">
                  <p className="text-gray-900">{userData.mob ? userData.mob: "Not Available"}</p>
                  </div>
                </div>
              </div>
              
              {/* Edit Button */}
              <div className="flex md:justify-end">
                <button className="h-10 px-4 py-2 bg-black hover:bg-green-400 hover:text-black text-red-500 font-medium rounded-md transition duration-150 ease-in-out"onClick={()=>Navigate("/editprofile",{state:{userData}})}>
                  Edit Profile
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="px-6 py-3 bg-black hover:bg-green-500 text-red-500 hover:text-black font-medium rounded-md shadow-sm transition duration-150 ease-in-out"onClick={()=>Navigate('/bookingview')}>
                Booking History
              </button>
              <button className="px-6 py-3 bg-sky-600 hover:bg-green-500 text-white font-medium rounded-md shadow-sm transition duration-150 ease-in-out">
                Wallet Amount: ₹{userData.walletAmount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
