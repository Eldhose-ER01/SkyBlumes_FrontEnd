import { useState } from "react";
import { AddStateAndistrict } from "../../../configure/admin";
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AdminNav from "../adminDash/AdminNav";

export default function AddStates() {
  const initialData = { statename: "", districtname: "", districtdesc: "" };
  const [statedatas, setstatedata] = useState(initialData);
  const [file, setFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name) {
      setstatedata({ ...statedatas, [name]: value });
    } else if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(statedatas));
      const response = await AddStateAndistrict(formData);
      if (response.data.success) {
        toast.success("Data Submitted");
        reset(initialData); // Reset the form fields
        setstatedata(initialData); // Reset the local state
        setFile(null); // Clear the file state
        setFileInputKey(Date.now());
        navigate('/admin/statesdistrict')
         // Update the key to reset the file input
      }
    } catch (error) {
      console.log(error);
      toast.error("Submission Failed");
    }
  };

 

  return (
    <>
  <div>
    <AdminNav />
  </div>
    <div className="flex sm:justify-center items-center h-screen flex-col mt-20 sm:mt-0 ">
      <h1 className="font-bold text-2xl text-center ">Add States and Districts</h1>
      <div className="lg:w-[30%] md:w-[40%] sm:w-[50%] w-[90%] sm:mt-0 mt- sm:ml-0 bg-gray-400 flex flex-col rounded-md">
        <div className="flex justify-center flex-col">
          <input
            {...register("statename", { required: true })}
            type="text"
            name="statename"
            value={statedatas.statename}
            onChange={handleChange}
            placeholder="Enter State Name"
            className="pl-2 bg-gray-200 sm:w-[90%] sm:h-[20%] md:h-12 lg:w-[90%] h-12 w-[90%] ml-4 lg:ml-5 lg:h-12 mt-9"
          />
          {errors.statename && (
            <span className="text-center" style={{ color: "red" }}>
              Please fill State Name
            </span>
          )}
         
          <input
            {...register("districtname", { required: true })}
            type="text"
            placeholder="Enter District Name"
            name="districtname"
            value={statedatas.districtname}
            onChange={handleChange}
            className="pl-2 bg-gray-200 sm:w-[90%] sm:h-[20%] md:h-12 lg:w-[90%] h-12 w-[90%] ml-4 lg:ml-5 lg:h-12 mt-4"
          />
          {errors.districtname && (
            <span className="text-center" style={{ color: "red" }}>
              Please fill District Name
            </span>
          )}
           <textarea
            {...register("districtdesc", { required: true })}
            name="districtdesc"
            id=""
            cols="30"
            rows="10"
            value={statedatas.districtdesc}
            onChange={handleChange}
            placeholder="Enter District description"
            className="pl-2 h-32 lg:w-[90%] lg:ml-5 sm:w-[90%] sm:h-28 md:h-28 md:w-[90%] w-[90%] ml-4 mt-4 lg:mt-4 bg-gray-200"
          />
          {errors.districtdesc && (
            <span className="text-center" style={{ color: "red" }}>
              Please fill Description
            </span>
          )}
          <input
            key={fileInputKey}
            type="file"
            onChange={handleChange}
            className="bg-gray-200 sm:w-[90%] sm:h-[20%] md:h-12 lg:w-[90%] h-12 w-[90%] ml-4 lg:ml-5 lg:h-12 mt-4"
          />
          <div className="flex justify-center mt-6 mb-6">
            <button
              className="w-[90%] h-12 rounded-lg text-white border-2 border-black hover:text-black font-bold bg-black hover:bg-[#50d28d]"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
      </>
  );
}
