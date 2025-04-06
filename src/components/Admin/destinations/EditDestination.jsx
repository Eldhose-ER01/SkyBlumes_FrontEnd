import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../adminDash/AdminNav";
import { finddistrict, editdestination } from "../../../configure/admin";
import { toast } from 'react-toastify';
import { userApi } from '../../../configure/api';
export default function EditDestination() {
    const location = useLocation();
    const destinations = location.state || {};
    const navigate=useNavigate()
    const [destination, setDestination] = useState({
        ...destinations,
        selectedImages: destinations.selectedImages || [],
        include: destinations.include || [],
        notIncludes: destinations.notIncludes || [],
        district: destinations.districtname || '',
        districtId: destinations.districtId || '',
        state: destinations.state || ''
    });

    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        finddistricts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestination({ ...destination, [name]: value });
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        const selectedDistrict = districts.find(district => district._id === selectedDistrictId);
        
        setDestination({ 
            ...destination, 
            district: selectedDistrict ? selectedDistrict.districtname : "",
            districtId: selectedDistrictId,
            districtname: selectedDistrict ? selectedDistrict.districtname : ""
        });
    };

    const addInclude = () => setDestination({ 
        ...destination, 
        include: [...(destination.include || []), ""] 
    });

    const addNotInclude = () => setDestination({ 
        ...destination, 
        notIncludes: [...(destination.notIncludes || []), ""] 
    });

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const currentImages = destination.selectedImages || [];
        
        if (files.length + currentImages.length > 3) {
            alert("You can only upload up to 3 images.");
            return;
        }
        setDestination({ 
            ...destination, 
            selectedImages: [...currentImages, ...files] 
        });
    };

    const removeImage = (index) => {
        const newImages = [...destination.selectedImages];
        newImages.splice(index, 1);
        setDestination({
            ...destination,
            selectedImages: newImages
        });
    };

    const finddistricts = async () => {
        try {
            const response = await finddistrict();
            if (response.data.success) {
                setDistricts(response.data.finddistrict);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getImageSrc = (image) => {
        if (typeof image === 'string') {
            if (image.startsWith('http')) {
                return image;
            }
            return `${userApi}/Images/${image}`;
        } else if (image instanceof File) {
            return URL.createObjectURL(image);
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            
            // Add all text fields
            formData.append('id', destination._id);
            formData.append('destination', destination.destination);
            formData.append('duration', destination.duration);
            formData.append('description', destination.description);
            formData.append('ticketPrice', destination.ticketPrice);
            formData.append('districtname', destination.district || '');
            formData.append('state', destination.state || '');
            
            // Handle include and notIncludes as JSON strings
            formData.append('include', JSON.stringify(destination.include || []));
            formData.append('notIncludes', JSON.stringify(destination.notIncludes || []));
            
            // Separate existing images (strings) from new images (File objects)
            const existingImages = destination.selectedImages
                .filter(img => typeof img === 'string')
                .map(img => img.replace(`${userApi}/Images/`, ''));
            
            formData.append('existingImages', JSON.stringify(existingImages));
            
            // Add new image files
            destination.selectedImages
                .filter(img => img instanceof File)
                .forEach(file => {
                    formData.append('selectedImages', file);
                });
            
            // Send to server
            const response = await editdestination(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data.success) {
                toast.success("Editing successfull")
                navigate('/admin/finddestination');
            } else {
                alert('Failed to update destination: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error updating destination:', error);
            alert('An error occurred while updating the destination');
        }
    };

    return (
        <>
            <div>
                <AdminNav/>
            </div>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Destination</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <input 
                        name="destination" 
                        value={destination.destination || ''} 
                        onChange={handleChange} 
                        placeholder="Destination Name" 
                        className="w-full p-2 border rounded" 
                        required 
                    />
                    <input 
                        name="duration" 
                        value={destination.duration || ''} 
                        onChange={handleChange} 
                        placeholder="Duration Time" 
                        className="w-full p-2 border rounded" 
                        required 
                    />
    
                    <textarea 
                        name="description" 
                        value={destination.description || ''} 
                        onChange={handleChange} 
                        placeholder="Place Description" 
                        className="col-span-2 w-full p-2 border rounded" 
                        required 
                    />
    
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">What is Included</label>
                            {(destination.include || []).map((item, index) => (
                                <input
                                    key={index}
                                    value={item}
                                    onChange={(e) => {
                                        const newIncludes = [...(destination.include || [])];
                                        newIncludes[index] = e.target.value;
                                        setDestination({ ...destination, include: newIncludes });
                                    }}
                                    placeholder={`Include item ${index + 1}`}
                                    className="w-full p-2 border rounded my-1"
                                />
                            ))}
                            <button type="button" onClick={addInclude} className="text-blue-500">+ Add More</button>
                        </div>
                        <div>
                            <label className="font-semibold">What is Not Included</label>
                            {(destination.notIncludes || []).map((item, index) => (
                                <input
                                    key={index}
                                    value={item}
                                    onChange={(e) => {
                                        const newNotIncludes = [...(destination.notIncludes || [])];
                                        newNotIncludes[index] = e.target.value;
                                        setDestination({ ...destination, notIncludes: newNotIncludes });
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
                            value={destination.ticketPrice || ''}
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
                            value={destination.districtId || ''}
                            onChange={handleDistrictChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value={destination.districtname}>Select District</option>
                            {districts.map((district) => (
                                <option key={district._id} value={district._id}>
                                    {district.districtname}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Hidden state field if needed */}
                    <input 
                        type="hidden" 
                        name="state" 
                        value={destination.state || ''} 
                        onChange={handleChange} 
                    />
    
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
                            {(destination.selectedImages || []).map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={getImageSrc(image)}
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
    
                    <button type="submit" className="col-span-2 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                        Update Destination
                    </button>
                </form>
            </div>
        </>
    );
}