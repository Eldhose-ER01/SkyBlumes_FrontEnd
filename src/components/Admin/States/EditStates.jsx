import { useState } from "react";
import { editStateAndDistrict } from "../../../configure/admin";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../adminDash/AdminNav";
import Axios from "axios";

export default function EditStates() {
  const location = useLocation();
  const navigate = useNavigate();
  const Statevalue = location.state || {};
  const [Statesdata, setState] = useState(Statevalue);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ---------------- Cloudinary Image Upload ----------------
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kesrrxni"); // your upload preset

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

    if (name && name !== "image") {
      setState({ ...Statesdata, [name]: value });
    } else if (files && files.length > 0) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageToCloudinary(files[0]);
        setState({ ...Statesdata, image: imageUrl });
        toast.success("Image uploaded successfully");
      } catch (error) {
        toast.error("Image upload failed");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onSubmit = async () => {
    if (isUploading) {
      toast.error("Please wait until image upload is complete");
      return;
    }

    try {
      // Send full JSON including Cloudinary URL
      const response = await editStateAndDistrict(Statesdata);
      if (response.data.success) {
        toast.success("Values updated successfully");
        navigate("/admin/statesdistrict");
      }
    } catch (error) {
      console.log(error);
      toast.error("Submission failed");
    }
  };

  return (
    <>
      <div>
        <AdminNav />
      </div>
      <div className="flex justify-center sm:items-center h-screen flex-col">
        <h1 className="font-bold text-2xl text-center">
          Edit your States and Districts
        </h1>
        <div className="lg:w-[30%] md:w-[40%] sm:w-[50%] w-[90%] sm:mt-0 mt-9 bg-gray-400 flex flex-col rounded-md">
          <div className="flex justify-center flex-col">
            {/* State Name */}
            <input
              {...register("statename", { required: true })}
              type="text"
              name="statename"
              defaultValue={Statesdata.statename}
              onChange={handleChange}
              placeholder="Enter State Name "
              className="pl-2 bg-gray-200 sm:w-[90%] sm:h-[20%] md:h-12 lg:w-[90%] h-12 w-[90%] ml-4 lg:ml-5 lg:h-12 mt-9"
            />
            {errors.statename && (
              <span className="text-center" style={{ color: "red" }}>
                Please fill state Name
              </span>
            )}

            {/* District Name */}
            <input
              {...register("districtname", { required: true })}
              type="text"
              placeholder="Enter District Name"
              name="districtname"
              defaultValue={Statesdata.districtname}
              onChange={handleChange}
              className="pl-2 bg-gray-200 sm:w-[90%] sm:h-[20%] md:h-12 lg:w-[90%] h-12 w-[90%] ml-4 lg:ml-5 lg:h-12 mt-4"
            />
            {errors.districtname && (
              <span className="text-center" style={{ color: "red" }}>
                Please fill District Name
              </span>
            )}

            {/* District Description */}
            <textarea
              {...register("districtdesc", { required: true })}
              name="districtdesc"
              cols="30"
              rows="10"
              defaultValue={Statesdata.districtdesc}
              onChange={handleChange}
              placeholder="Enter district description"
              className="pl-2 h-32 lg:w-[90%] lg:ml-5 sm:w-[90%] sm:h-28 md:h-28 md:w-[90%] w-[90%] ml-4 mt-4 lg:mt-4 bg-gray-200"
            />
            {errors.districtdesc && (
              <span className="text-center" style={{ color: "red" }}>
                Please fill Description
              </span>
            )}

            {/* Image Upload */}
            <label className="block text-xs font-medium text-gray-600 mb-1 mt-4 ml-4 lg:ml-5">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="bg-gray-200 sm:w-[90%] sm:h-[20%] md:h-12 lg:w-[90%] h-12 w-[90%] ml-4 lg:ml-5 lg:h-12"
              disabled={isUploading}
            />
            {isUploading && (
              <p className="text-blue-500 text-sm mt-1 ml-4 lg:ml-5">
                Uploading image...
              </p>
            )}
            {Statesdata.image && !isUploading && (
              <p className="text-green-500 text-sm mt-1 ml-4 lg:ml-5">
                Image uploaded successfully!
              </p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-6 mb-6">
              <button
                className="w-[90%] h-12 rounded-lg text-white border-2 border-black hover:text-black font-bold bg-black hover:bg-[#50d28d]"
                onClick={handleSubmit(onSubmit)}
                disabled={isUploading}
              >
                {isUploading ? "Publishing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
