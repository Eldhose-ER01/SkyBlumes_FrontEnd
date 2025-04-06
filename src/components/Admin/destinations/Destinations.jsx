import { useState, useEffect } from "react";
import { finddestinations,Destinationdelete } from "../../../configure/admin";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { userApi } from '../../../configure/api';
import AdminNav from "../adminDash/AdminNav";

export default function Destinations() {
  const Navigage=useNavigate()
  const [States, setstate] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalpages] = useState(0);
  const [search, setSearch] = useState("");
  
  const handleClick = (index) => {
    setPage(index + 1);
  };

  const finddatas = async () => {
    try {
      const response = await finddestinations(page, search);
      if (response.data.success) {
        setstate(response.data.finddestinations);
        setTotalpages(response.data.totalpages);
        setPage(response.data.page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    finddatas();
  }, [page, search]);

  const DestinationDelete = async (id) => {
    try {
      const response = await Destinationdelete(id);  // Passing the id correctly
      if (response.data.success) {
        finddatas()
        toast.success("Destination Deleted")
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
  <div>
    <AdminNav />
  </div>
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Destination Management
          </h1>
          <Link 
            to="/admin/destinations"
            className="bg-black hover:bg-green-400 text-green-500 hover:text-black font-medium py-2 px-4 rounded-md transition-colors"
          >
            Add Destination
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <input
                className="w-full h-10 pl-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                name="search"
                placeholder="Search destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Ticket Price
                  </th>
                 
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Update
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {States.length > 0 ? (
                  States.map((states, index) => (
                    <tr key={states._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {states.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={`${userApi}/Images/${states.selectedImages[0]}`}
                          alt={states.destination}
                          className="w-24 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                      ₹{states.ticketPrice}
                      </td>
                     
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        
                      <button
                          onClick={() => Navigage('/admin/editdestination', { state: states })}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
  onClick={() => DestinationDelete(states._id)}
  className="px-4 py-2 bg-blue-100 text-red-700 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
>
  Delete
</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No destinations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 0 && (
          <div className="flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px">
              {[...Array(totalPages)].map((val, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    page === index + 1
                      ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
    </>
  );
}