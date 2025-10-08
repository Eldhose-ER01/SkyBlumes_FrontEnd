import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Destinations, finddistrict } from "../../../configure/admin";
import AdminNav from "../adminDash/AdminNav";
import Axios from "axios";

export default function Adddestination() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        destination: "",
        duration: "",
        description: "",
        includes: [""],
        notIncludes: [""],
        ticketPrice: "",
        images: [], // Store Cloudinary URLs
        district: "",
        districtId: ""
    });
    const [districts, setDistricts] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        const selectedDistrict = districts.find(d => d._id === selectedDistrictId);
        setFormData({
            ...formData,
            district: selectedDistrict ? selectedDistrict.districtname : "",
            districtId: selectedDistrictId
        });
    };

    const addInclude = () => setFormData({ ...formData, includes: [...formData.includes, ""] });
    const addNotInclude = () => setFormData({ ...formData, notIncludes: [...formData.notIncludes, ""] });

    // Cloudinary image upload
    const uploadToCloudinary = async (file) => {
        const cloudData = new FormData();
        cloudData.append("file", file);
        cloudData.append("upload_preset", "kesrrxni"); // replace with your preset
        try {
            const res = await Axios.post("https://api.cloudinary.com/v1_1/dotjc7vax/image/upload", cloudData);
            return res.data.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            toast.error("Failed to upload image");
            return null;
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length + formData.images.length > 3) {
            alert("You can only upload up to 3 images.");
            return;
        }

        setUploading(true);
        const urls = [];
        for (let file of files) {
            const url = await uploadToCloudinary(file);
            if (url) urls.push(url);
        }
        setFormData({ ...formData, images: [...formData.images, ...urls] });
        setUploading(false);
    };

    const removeImage = (index) => {
        setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
    };

    const fetchDistricts = async () => {
        try {
            const response = await finddistrict();
            if (response.data.success) {
                setDistricts(response.data.finddistrict);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDistricts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uploading) return toast.error("Please wait for images to finish uploading");

        try {
            const payload = {
                ...formData,
                includes: formData.includes.filter(item => item.trim() !== ""),
                notIncludes: formData.notIncludes.filter(item => item.trim() !== "")
            };
            const response = await Destinations(payload);
            if (response.data.success) {
                toast.success("Destination Added Successfully");
                setFormData({
                    destination: "",
                    duration: "",
                    description: "",
                    includes: [""],
                    notIncludes: [""],
                    ticketPrice: "",
                    images: [],
                    district: "",
                    districtId: ""
                });
                navigate("/admin/finddestination");
            }
        } catch (error) {
            console.error(error);
            toast.error("Submission failed");
        }
    };

    return (
        <>
            <AdminNav />
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
                            {districts.map(district => (
                                <option key={district._id} value={district._id}>{district.districtname}</option>
                            ))}
                        </select>
                    </div>

                    {/* Cloudinary Image Upload */}
                    <div className="col-span-2">
                        <label className="font-semibold block mb-2">Upload Images (Max 3)</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            id="imageUpload"
                            onChange={handleImageUpload}
                            disabled={uploading}
                        />
                        <label htmlFor="imageUpload" className="block w-full p-3 text-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:bg-gray-100">
                            {uploading ? "Uploading..." : "Click to Upload or Drag & Drop Images Here"}
                        </label>

                        {/* Image Preview */}
                        <div className="flex gap-2 mt-3">
                            {formData.images.map((url, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={url}
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

                    <button type="submit" className="col-span-2 w-full bg-blue-600 text-white p-2 rounded">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}
