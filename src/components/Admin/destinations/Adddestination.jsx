import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Destinations, finddistrict } from "../../../configure/admin";
import AdminNav from "../adminDash/AdminNav";

export default function Adddestination() {
    const navigagte=useNavigate()
    const [formData, setFormData] = useState({
        destination: "",
        duration: "",
        description: "",
        includes: [""],
        notIncludes: [""],
        ticketPrice: "",
        selectedImages: [],
        district: "", // district name
        districtId: "" // district ID
    });

    const [districts, setDistricts] = useState([]); // Changed variable name to be more descriptive
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        const selectedDistrict = districts.find(district => district._id === selectedDistrictId);
        
        setFormData({ 
            ...formData, 
            district: selectedDistrict ? selectedDistrict.districtname : "",
            districtId: selectedDistrictId 
        });
    };

    const addInclude = () => setFormData({ ...formData, includes: [...formData.includes, ""] });
    const addNotInclude = () => setFormData({ ...formData, notIncludes: [...formData.notIncludes, ""] });

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + formData.selectedImages.length > 3) {
            alert("You can only upload up to 3 images.");
            return;
        }
        setFormData({ ...formData, selectedImages: [...formData.selectedImages, ...files] });
    };

    // Remove Image
    const removeImage = (index) => {
        setFormData({
            ...formData,
            selectedImages: formData.selectedImages.filter((_, i) => i !== index)
        });
    };

    const finddistricts = async () => {
        try {
            const response = await finddistrict();
            if (response.data.success) {
                setDistricts(response.data.finddistrict); // Changed to setDistricts
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        finddistricts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const { destination, duration, description, includes, notIncludes, ticketPrice, district, districtId, selectedImages } = formData;
            const formDataToSend = new FormData();
            
            formDataToSend.append("data", JSON.stringify({
                destination, duration, description,
                includes: includes.filter(item => item.trim() !== ""),
                notIncludes: notIncludes.filter(item => item.trim() !== ""),
                ticketPrice, district, districtId
            }));
            
            selectedImages.forEach(image => formDataToSend.append("selectedImages", image));
            
            const response = await Destinations(formDataToSend);
            if (response.data.success) {
                toast.success("Destination Added Successfully");
                setFormData({
                    destination: "", duration: "", description: "",
                    includes: [""], notIncludes: [""], ticketPrice: "",
                    selectedImages: [], district: "", districtId: ""
                });
                navigagte("/admin/finddestination")
            }
        } catch (error) {
            console.error(error);
            toast.error("Submission failed");
        }
    };

    return (
        <>
   <div>
    <AdminNav />
   </div>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Destination Adding Form</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination Name" className="w-full p-2 border rounded" required />
                <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration Time" className="w-full p-2 border rounded" required />

                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Place Description" className="col-span-2 w-full p-2 border rounded" required />

                <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">What is Included</label>
                        {formData.includes.map((item, index) => (
                            <input
                                key={index}
                                value={item}
                                onChange={(e) => {
                                    const newIncludes = [...formData.includes];
                                    newIncludes[index] = e.target.value;
                                    setFormData({ ...formData, includes: newIncludes });
                                }}
                                placeholder={`Include item ${index + 1}`}
                                className="w-full p-2 border rounded my-1"
                            />
                        ))}
                        <button type="button" onClick={addInclude} className="text-blue-500">+ Add More</button>
                    </div>
                    <div>
                        <label className="font-semibold">What is Not Included</label>
                        {formData.notIncludes.map((item, index) => (
                            <input
                                key={index}
                                value={item}
                                onChange={(e) => {
                                    const newNotIncludes = [...formData.notIncludes];
                                    newNotIncludes[index] = e.target.value;
                                    setFormData({ ...formData, notIncludes: newNotIncludes });
                                }}
                                placeholder={`Not include item ${index + 1}`}
                                className="w-full p-2 border rounded my-1"
                            />
                        ))}
                        <button type="button" onClick={addNotInclude} className="text-blue-500">+ Add More</button>
                    </div>
                </div>

                <div className="">
                    <label className="font-semibold block mb-1">Ticket Price</label>
                    <input
                        name="ticketPrice"
                        value={formData.ticketPrice}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter Ticket Price"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="font-semibold block mb-1">District</label>
                    <select
                        name="districtId"
                        value={formData.districtId}
                        onChange={handleDistrictChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district._id} value={district._id}>
                                {district.districtname}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Image Upload Section */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-2">Upload Images (Max 3)</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="imageUpload"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="imageUpload" className="block w-full p-3 text-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:bg-gray-100">
                        Click to Upload or Drag & Drop Images Here
                    </label>

                    {/* Image Preview */}
                    <div className="flex gap-2 mt-3">
                        {formData.selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Selected"
                                    className="w-24 h-24 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs"
                                    onClick={() => removeImage(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="col-span-2 w-full bg-blue-600 text-white p-2 rounded">Submit</button>
            </form>
        </div>
        </>
    );
}