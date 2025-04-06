import { useState, useEffect } from 'react';
import UserNav from '../Usernav/UserNav';
import Footer from '../Footer/Footer';
import { userApi } from '../../../configure/api';
import { finddistrict } from '../../../configure/admin';
import { useNavigate } from 'react-router-dom';
export default function SelectStates() {
  const [states, setStates] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [selectedState, setSelectedState] = useState(null); // Track selected button
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const Navigate=useNavigate()
  const findDistrcitandstates = async () => {
    try {
      const response = await finddistrict();
      if (response.data.success) {
        setStates(response.data.finddistrict);
        setFilterData(response.data.finddistrict);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterdatas = (statename) => {
    setSelectedState(statename); // Set selected state
    const filter = states.filter((value) => value.statename === statename);
    setFilterData(filter);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterdata.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterdata.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  


  useEffect(() => {
    findDistrcitandstates();
  }, []);

  return (
    <>
      <UserNav />
      <div className='text-center mt-2'>
        <h1 className="text-lg inline-block text-black">
          Please choose State And District
        </h1>
      </div>

      {/* State Selection Buttons */}
      <div className="flex flex-wrap justify-center gap-2 max-w-screen-lg mx-auto mt-6">
        {states.map((state, index) => (
          <button
            key={index}
            className={`w-36 h-12 ${
              selectedState === state.statename
                ? "bg-green-400 text-white" // Active button
                : "bg-black text-white"
            } hover:bg-green-400 hover:text-black
               active:scale-95 active:bg-green-400 active:text-black
               outline-none focus:outline-none
               rounded-sm transition-transform duration-100`}
            onClick={() => filterdatas(state.statename)}
          >
            {state.statename}
          </button>
        ))}
      </div>

      {/* District Cards */}
    {/* District Cards */}
<div className="container mx-auto px-4 py-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {currentItems.map((state) => (
      <div key={state.id} className="bg-white rounded-md shadow-xl flex flex-col h-full">
        <img
          src={`${userApi}/Images/${state.image}`}
          className="w-full h-48 object-cover overflow-hidden hover:scale-105 rounded-md"
          alt={state.districtname}
        />
        <div className='text-center mt-2 text-xl font-semibold'>
          {state.districtname}
        </div>
        <div className="p-4">
          <p className="text-gray-600">{state.districtdesc}</p>
        </div>
        <div className='mt-auto p-4'> {/* This pushes the button to the bottom */}
          <button 
            className='w-full h-12 bg-black text-white font-semibold hover:bg-green-400 hover:text-black rounded-md'
            onClick={() => Navigate('/destinations', { state: { district: state.districtname } })}
          >
            Select Now
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Pagination remains the same */}
  <div className="flex justify-center mt-8 mb-12">
    <div className="flex space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => paginate(index + 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-md ${
            currentPage === index + 1
              ? "bg-black text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>
</div>

      <Footer />
    </>
  );
}
