import { useState } from "react";
import { AddStateAndistrict } from "../../../configure/admin";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AdminNav from "../adminDash/AdminNav";
import Axios from "axios";

export default function AddStates() {
  const initialData = { statename: "", districtname: "", districtdesc: "", image: null };
  const [statedatas, setstatedata] = useState(initialData);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Cloudinary upload function
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kesrrxni"); // replace with your preset

    try {
      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dotjc7vax/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleChange = async (event) => {
    const { name, value, files } = event.target;

    if (files && files.length > 0) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageToCloudinary(files[0]);
        setstatedata(prev => ({ ...prev, image: imageUrl }));
        toast.success("Image uploaded successfully");
      } catch (error) {
        toast.error("Image upload failed");
      } finally {
        setIsUploading(false);
      }
    } else if (name) {
      setstatedata(prev => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async () => {
    if (isUploading) {
      toast.error("Please wait for the image to finish uploading");
      return;
    }

    try {
      console.log(statedatas,"statedatasstatedatas");
      
      const response = await AddStateAndistrict(statedatas); // send JSON data including image URL
      if (response.data.success) {
        toast.success("Data Submitted");
        reset(initialData);
        setstatedata(initialData);
        navigate('/admin/statesdistrict');
      }
    } catch (error) {
      console.log(error);
      toast.error("Submission Failed");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="flex sm:justify-center items-center h-screen flex-col mt-20 sm:mt-0">
        <h1 className="font-bold text-2xl text-center mb-4">Add States and Districts</h1>
        <div className="lg:w-[30%] md:w-[40%] sm:w-[50%] w-[90%] bg-gray-400 flex flex-col rounded-md p-4">
          
          {/* State Name */}
          <input
            {...register("statename", { required: true })}
            type="text"
            name="statename"
            value={statedatas.statename}
            onChange={handleChange}
            placeholder="Enter State Name"
            className="pl-2 bg-gray-200 w-full h-12 mt-4 rounded"
          />
          {errors.statename && <span className="text-red-500 text-sm">Please fill State Name</span>}

          {/* District Name */}
          <input
            {...register("districtname", { required: true })}
            type="text"
            placeholder="Enter District Name"
            name="districtname"
            value={statedatas.districtname}
            onChange={handleChange}
            className="pl-2 bg-gray-200 w-full h-12 mt-4 rounded"
          />
          {errors.districtname && <span className="text-red-500 text-sm">Please fill District Name</span>}

          {/* District Description */}
          <textarea
            {...register("districtdesc", { required: true })}
            name="districtdesc"
            value={statedatas.districtdesc}
            onChange={handleChange}
            placeholder="Enter District description"
            className="pl-2 mt-4 w-full h-32 bg-gray-200 rounded"
          />
          {errors.districtdesc && <span className="text-red-500 text-sm">Please fill Description</span>}

          {/* Image Upload */}
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full bg-gray-200 h-12 rounded"
              disabled={isUploading}
            />
            
            {isUploading && (
              <div className="flex items-center mt-2 text-blue-500 text-sm">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                Uploading image...
              </div>
            )}

            {statedatas.image && !isUploading && (
              <p className="text-green-500 mt-1 text-sm">Image uploaded successfully!</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6 mb-6">
            <button
              className="w-full h-12 rounded-lg text-white border-2 border-black font-bold bg-black hover:bg-[#50d28d] hover:text-black"
              onClick={handleSubmit(onSubmit)}
              disabled={isUploading}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
