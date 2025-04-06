import { useState } from "react";
import { editStateAndDistrict } from "../../../configure/admin";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../adminDash/AdminNav";

export default function EditStates() {
  const location = useLocation();
  const navigate = useNavigate();
  const Statevalue = location.state || {};
  const [Statesdata,Setstate] = useState(Statevalue);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name) {
      Setstate({ ...Statesdata, [name]: value });
    } else if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData()
     
      formData.append("file", file);
      formData.append("data", JSON.stringify(Statesdata));
      const response = await editStateAndDistrict(formData);
      if (response.data.success) {
        toast.success("Values is Updated")
        navigate("/admin/statesdistrict");
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
    <div className="flex justify-center sm:items-center h-screen flex-col">
      <h1 className="font-bold text-2xl text-center">Edit your States and Districts</h1>
      <div className="lg:w-[30%] md:w-[40%] sm:w-[50%] w-[90%] sm:mt-0 mt-9 bg-gray-400 flex flex-col rounded-md">
        <div className="flex justify-center flex-col">
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
              Please fill DistrictName
            </span>
          )}
          <textarea
            {...register("districtdesc", { required: true })}
            name="districtdesc"
            id=""
            cols="30"
            rows="10"
            defaultValue={Statesdata.districtdesc}
            onChange={handleChange}
            placeholder="Enter districtdesc"
            className="pl-2 h-32 lg:w-[90%] lg:ml-5 sm:w-[90%] sm:h-28 md:h-28 md:w-[90%] w-[90%] ml-4 mt-4 lg:mt-4 bg-gray-200"
          />
          {errors.districtdesc && (
            <span className="text-center" style={{ color: "red" }}>
              Please fill Description
            </span>
          )}
          <input
            type="file"
            name="image"
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
