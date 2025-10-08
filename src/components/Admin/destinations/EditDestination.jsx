import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../adminDash/AdminNav";
import { finddistrict, editdestination } from "../../../configure/admin";
import { toast } from "react-toastify";
import axios from "axios";

export default function EditDestination() {
  const location = useLocation();
  const navigate = useNavigate();
  const destinations = location.state || {};

  const [destination, setDestination] = useState({
    ...destinations,
    selectedImages: destinations.selectedImages || [],
    include: destinations.include || [],
    notIncludes: destinations.notIncludes || [],
    district: destinations.districtname || "",
    districtId: destinations.districtId || "",
    state: destinations.state || ""
  });

  const [districts, setDistricts] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const res = await finddistrict();
      if (res.data.success) setDistricts(res.data.finddistrict);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestination({ ...destination, [name]: value });
  };

  const handleDistrictChange = (e) => {
    const selectedId = e.target.value;
    const selected = districts.find(d => d._id === selectedId);
    setDestination({
      ...destination,
      districtId: selectedId,
      district: selected ? selected.districtname : ""
    });
  };

  const addInclude = () =>
    setDestination({ ...destination, include: [...(destination.include || []), ""] });

  const addNotInclude = () =>
    setDestination({ ...destination, notIncludes: [...(destination.notIncludes || []), ""] });

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + destination.selectedImages.length > 3) {
      toast.error("You can only upload up to 3 images.");
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls = [];

      for (let file of files) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File too large (Max 5MB)");
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "kesrrxni"); // Replace with your preset

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dotjc7vax/image/upload", // Replace with your Cloud name
          formData
        );
        uploadedUrls.push(res.data.secure_url);
      }

      setDestination((prev) => ({
        ...prev,
        selectedImages: [...prev.selectedImages, ...uploadedUrls]
      }));

      toast.success("Images uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    }
    setUploading(false);
  };

  const removeImage = (index) => {
    const newImages = [...destination.selectedImages];
    newImages.splice(index, 1);
    setDestination({ ...destination, selectedImages: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...destination,
        include: destination.include.filter((i) => i.trim() !== ""),
        notIncludes: destination.notIncludes.filter((i) => i.trim() !== "")
      };

      const res = await editdestination(payload); // send JSON with Cloudinary URLs
      if (res.data.success) {
        toast.success("Destination updated successfully");
        navigate("/admin/finddestination");
      } else {
        toast.error("Failed to update destination");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update destination");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Destination</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="destination"
            value={destination.destination || ""}
            onChange={handleChange}
            placeholder="Destination Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="duration"
            value={destination.duration || ""}
            onChange={handleChange}
            placeholder="Duration Time"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={destination.description || ""}
            onChange={handleChange}
            placeholder="Place Description"
            className="col-span-2 w-full p-2 border rounded"
            required
          />

          {/* Include / Not Include */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">What is Included</label>
              {(destination.include || []).map((item, idx) => (
                <input
                  key={idx}
                  value={item}
                  onChange={(e) => {
                    const arr = [...destination.include];
                    arr[idx] = e.target.value;
                    setDestination({ ...destination, include: arr });
                  }}
                  placeholder={`Include item ${idx + 1}`}
                  className="w-full p-2 border rounded my-1"
                />
              ))}
              <button type="button" onClick={addInclude} className="text-blue-500">
                + Add More
              </button>
            </div>
            <div>
              <label className="font-semibold">What is Not Included</label>
              {(destination.notIncludes || []).map((item, idx) => (
                <input
                  key={idx}
                  value={item}
                  onChange={(e) => {
                    const arr = [...destination.notIncludes];
                    arr[idx] = e.target.value;
                    setDestination({ ...destination, notIncludes: arr });
                  }}
                  placeholder={`Not include item ${idx + 1}`}
                  className="w-full p-2 border rounded my-1"
                />
              ))}
              <button type="button" onClick={addNotInclude} className="text-blue-500">
                + Add More
              </button>
            </div>
          </div>

          <input
            name="ticketPrice"
            type="number"
            value={destination.ticketPrice || ""}
            onChange={handleChange}
            placeholder="Ticket Price"
            className="w-full p-2 border rounded"
            required
          />

          <select
            value={destination.districtId || ""}
            onChange={handleDistrictChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d._id} value={d._id}>
                {d.districtname}
              </option>
            ))}
          </select>

          {/* Images */}
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
            <label
              htmlFor="imageUpload"
              className="block w-full p-3 text-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:bg-gray-100"
            >
              {uploading ? "Uploading..." : "Click to Upload or Drag & Drop Images Here"}
            </label>

            <div className="flex gap-2 mt-3">
              {destination.selectedImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt="Selected"
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs"
                    onClick={() => removeImage(idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="col-span-2 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Update Destination
          </button>
        </form>
      </div>
    </>
  );
}
