import { useState,useEffect } from 'react';
// import { FindBookings } from '../../../configure/user';
import { CompleteBooking,findbookingdata } from '../../../configure/admin';
import { userApi } from '../../../configure/api';
import { toast } from 'react-toastify';
import AdminNav from '../adminDash/AdminNav';
export default function AdminBookingView() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);

  const itemsPerPage = 7;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const findbooking=async()=>{
    try {
        const response=await findbookingdata()
        if(response.data.success){
            setBookings(response.data.bookingdata)
        }
    } catch (error) {
        console.log(error);
    }
  }
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCompleteBooking =async(id) => {
   try {
    const response=await CompleteBooking(id)
        if(response.data.success){
            findbooking()
            toast.success("Booking Completed")
          
        }
    
   } catch (error) {
    console.log(error);
    
   }
  };
  
  useEffect(() => {
    findbooking()
  }, [])

  return (
    <>
   <div>
    <AdminNav />
   </div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Booking List</h1>
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">Booking ID</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">State</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">District</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">Destination</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">Amount</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">People</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">BookingComplete</th>

              <th className="py-3 px-4 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700 text-center">{booking._id.slice(-4)}</td>
                <td className="py-4 px-4 text-gray-700 text-center">{booking.state.statename}</td>
                <td className="py-4 px-4 text-gray-700 text-center">{booking.state.districtname}</td>
                <td className="py-4 px-4 text-gray-700 text-center">{booking.destination.destination}</td>
                <td className="py-4 px-4 text-gray-700 text-center">₹{booking.totalAmount}</td>
                <td className="py-4 px-4 text-center text-gray-700">{booking.peopleCount}</td>
                <td className="py-4 px-4">
                  <div className="flex justify-center">
                    <button 
                      className={`px-4 py-2 text-white rounded-md transition-colors ${
                        booking.status === "booked" ? "bg-green-600 hover:bg-green-700" : 
                        booking.status === "Cancelled" ? "bg-red-600 hover:bg-red-700" : 
                        booking.status === "Completed" ? "bg-blue-600 hover:bg-blue-700" :
                        "bg-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      {booking.status}
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4">
                <div className="flex justify-center">
                {booking.status === "booked" && (
                      <button 
                        className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-sky-400 transition-colors"
                        onClick={() => handleCompleteBooking(booking._id)}
                      >
                        Complete
                      </button>
                    )}
                    </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center space-x-2">
                    
                    <button 
                      onClick={() => openModal(booking)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {number}
          </button>
        ))}
        
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={`${userApi}/Images/${selectedBooking.destination.selectedImages[0]}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Booking ID</h3>
                      <p className="text-gray-600">{selectedBooking._id.slice(-4)}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">State</h3>
                      <p className="text-gray-600">{selectedBooking.state.statename}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">District</h3>
                      <p className="text-gray-600">{selectedBooking.state.districtName}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Destination</h3>
                      <p className="text-gray-600">{selectedBooking.destination.destination}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Amount</h3>
                  <p className="text-gray-600">₹{selectedBooking.totalAmount}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Total People</h3>
                  <p className="text-gray-600">{selectedBooking.peopleCount}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Date</h3>
                  <p className="text-gray-600">
                    {new Date(selectedBooking.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).replace(/\//g, '-')}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Exploring Time</h3>
                  <p className="text-gray-600">{selectedBooking.duration}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={closeModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}